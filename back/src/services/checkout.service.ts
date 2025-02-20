import { DataSource, QueryRunner } from "typeorm";
import { Shopping, StateShopping } from "../entity/Shopping.entity";
import { Checkout, StatusCheckout } from "../entity/Checkout.entity";
import { Product } from "../entity/Product.entity";
import { checkoutRepository } from "../repositories/checkout.repository";
import {
	BASE_URL,
	PAYPAL_API,
	PAYPAL_CLIENT,
	PAYPAL_SECRET,
} from "../config/env";
import axios from "axios";

interface CheckoutWithLinks extends Checkout {
    links?: {
        href: string;
        rel: string;
        method: string;
    }[];
}
export class CheckoutService {
	constructor(private dataSource: DataSource) {}

	async createOrder(shopping: Shopping[], amount: number) {

		if (isNaN(amount)) throw new Error("The amount must be a valid number");
		const order = {
			intent: "CAPTURE",
			purchase_units: [
				{
					amount: {
						currency_code: "USD",
						value: amount.toFixed(2),
					},
				},
			],
			payment_source: {
				paypal: {
					experience_context: {
						brand_name: "Checkpoint Zone",
						user_action: "PAY_NOW",
						return_url: `${BASE_URL}/api/checkouts/capture`,
						cancel_url: `${BASE_URL}/api/checkouts/cancel`,
					},
				},
			},
		};

		try {
			const auth = new URLSearchParams();
			auth.append("grant_type", "client_credentials");

			const {
				data: { access_token },
			} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, auth, {
				auth: {
					username: PAYPAL_CLIENT!,
					password: PAYPAL_SECRET!,
				},
			});

			const response = await axios.post(
				`${PAYPAL_API}/v2/checkout/orders`,
				order,
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			);

			return response.data;
		} catch (error) {
			const typedError = error as Error;
			console.error("Error creating order:", typedError.message);
			throw new Error("Failed to create order");
		}
	}

	async captureOrder(token: string, payerID: string): Promise<any> {
		if (!token || !payerID) throw new Error("Token and PayerID are required");

		const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			
			const checkout = await checkoutRepository.findOne({ where: { id_checkout: token } });
			if (!checkout) throw new Error("Checkout not found");

			const userShoppings = await queryRunner.manager.find(Shopping, {
				where: { user_id: checkout?.shopping_user },
				relations: ["products"],
			});

			let pendingShoppings = userShoppings.filter(
				(shopping) => shopping.state === StateShopping.PENDING
			);

			const captureResponse = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
				auth: {
					username: PAYPAL_CLIENT!,
					password: PAYPAL_SECRET!,
				},
			});
			const { status: orderStatus, update_time: captureDate } = captureResponse.data;

			const paymentResponse = {
				status: orderStatus === "COMPLETED" ? "success" : "declined",
				captureDate,
				paypalOrderId: captureResponse.data.id,
			};

			const checkoutRecords: Checkout[] = [];
			for (const shopping of pendingShoppings) {
				const checkout = new Checkout();

				if (paymentResponse.status === "success") {
					const product = shopping.products;

					product.stock -= shopping.quantity;
					product.available = product.stock > 0;
					await queryRunner.manager.save(Product, product);

					shopping.state = StateShopping.COMPLETED;
					checkout.status = StatusCheckout.PAID;
				}

				await queryRunner.manager.save(Shopping, shopping);

				checkout.id_checkout = paymentResponse.paypalOrderId;
				checkout.shopping_user = shopping.user_id;
				checkout.shopping_products = shopping.products_id;
				checkout.date_checkout = paymentResponse.captureDate;
				const savedCheckout = await queryRunner.manager.save(Checkout, checkout);
				checkoutRecords.push(savedCheckout);
			}

			await queryRunner.commitTransaction();
			return checkoutRecords;

		} catch (error) {
			const typedError = error as Error;
			console.error("Error capturing payment:", typedError.message);
			throw new Error("Failed to capture order");
		} finally { 
			await queryRunner.release();
		}
	}

	async cancelOrder(token: string): Promise<any[]> {
		const queryRunner = this.dataSource.createQueryRunner();
    	await queryRunner.connect();
    	await queryRunner.startTransaction();

		try {
			await queryRunner.manager.update(Checkout, { id_checkout: token }, { status: StatusCheckout.DECLINED });
			const updatedShoppings = await queryRunner.manager.find(Shopping, { where: { state: StateShopping.PENDING } });

			for (const shopping of updatedShoppings) {
				shopping.state = StateShopping.CANCELLED;
				await queryRunner.manager.save(Shopping, shopping);
			}
	
			await queryRunner.commitTransaction();
			return updatedShoppings;
		} catch (error) {
			await queryRunner.rollbackTransaction();
	        console.error("Error in cancelOrder:", error);
	        throw error;
		} finally {
			await queryRunner.release();
		}
	}

	async createCheckout(user: number): Promise<Checkout[]> {
		const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {

			const userShoppings = await queryRunner.manager.find(Shopping, {
				where: { user_id: user },
				relations: ["products"],
			});

			let pendingShoppings = userShoppings.filter(
				(shopping) => shopping.state === StateShopping.PENDING
			);

			const existingCheckout = await queryRunner.manager.findOne(Checkout, {
				where: { shopping_user: user, status: StatusCheckout.PENDING },
			});

			if (existingCheckout){
				(existingCheckout as CheckoutWithLinks).links = [
					{
						href: `${PAYPAL_API}/v2/checkout/orders/${existingCheckout.id_checkout}`,
						rel: "self",
						method: "GET",
					},
					{
						href: `https://www.sandbox.paypal.com/checkoutnow?token=${existingCheckout.id_checkout}`,
						rel: "payer-action",
						method: "GET",
					},
				];
				return [existingCheckout];
			}
			
			if (pendingShoppings.length === 0) {
				const shoppingsToReactivate = userShoppings.filter(
					(shopping) => shopping.state !== StateShopping.PENDING
				);

				if (shoppingsToReactivate.length === 0) {
					throw new Error(
						"No shopping records found for the user to process."
					);
				}

				for (const shopping of shoppingsToReactivate) {
					shopping.state = StateShopping.PENDING;
					await queryRunner.manager.save(Shopping, shopping);
				}

				pendingShoppings = shoppingsToReactivate;
			}

			for (const shopping of pendingShoppings) {
				const product = shopping.products;
				if (!product || product.stock < shopping.quantity) {
					throw new Error(
						`Insufficient stock for product ID: ${shopping.products_id}.`
					);
				}
			}

			// Realizar el pago con PayPal
			const totalAmount = pendingShoppings.reduce((total, shopping) => {
				return total + shopping.products.price * shopping.quantity;
			}, 0);

			const orderDetails = await this.createOrder(
				pendingShoppings,
				totalAmount
			);
			const { id: idOrder } = orderDetails;

			const newCheckout: Checkout[] = [];
			for (const shopping of pendingShoppings) {
				const checkout = new Checkout();
				checkout.shopping_user = shopping.user_id;
				checkout.shopping_products = shopping.products_id;
				checkout.status = StatusCheckout.PENDING;
				checkout.id_checkout = idOrder;
				checkout.date_checkout = new Date();

				newCheckout.push(checkout);
			}

			await queryRunner.manager.save(Checkout, newCheckout);
			await queryRunner.commitTransaction();
			return orderDetails;
		} catch (error) {
			console.error("Error in createCheckout: ", error);
			await queryRunner.rollbackTransaction();
			throw new Error("Error creating checkout");
		} finally {
			await queryRunner.release();
		}
	}

	async getAllCheckout(): Promise<Checkout[]> {
		const allCheckouts = await checkoutRepository.find({
			relations: {
				shopping: {
					products: true,
					users: true
				}
			}
		});

		return this.transformCheckouts(allCheckouts);
	}

	async getCheckoutById(id: string): Promise<Checkout []> {
		const idCheckouts = await checkoutRepository.find({ 
			where: { id_checkout: id },
			relations: {
				shopping: {
					products: true,
					users: true
				}
			} 
		});
		
		return this.transformCheckouts(idCheckouts);
	}

	async getCheckoutsByStatus(status: StatusCheckout): Promise<Checkout[]> {
		const statusCheckouts = await checkoutRepository.find({
			where: { status },
			relations: {
				shopping: {
					products: true,
					users: true
				},
			}
		});
		
		return this.transformCheckouts(statusCheckouts);
	}

	async getCheckoutsByUser(userId: number): Promise<Checkout[]> {
		const rawCheckouts = await checkoutRepository.find({
			where: { shopping_user: userId },
			relations: {
				shopping: {
					products: true,
					users: true
				}
			}
		});

		return this.transformCheckouts(rawCheckouts);

	}

	private transformCheckouts(checkouts: any[]): any[] {

		const grouped = checkouts.reduce((acc, item) => {
			const {
			  id_checkout,
			  status,
			  date_checkout,
			  shopping_user,
			  shopping_products,
			  shopping,
			} = item;

			const userName = shopping.users?.name || "Name unknown";
		
			let existingCheckout = acc.find((c: any) => c.id_checkout === id_checkout);
		
			if (!existingCheckout) {
			  existingCheckout = {
				id_checkout,
				status,
				date_checkout,
				shopping_user: userName,
				shopping_products: [],
				total: 0,
			  };
			  acc.push(existingCheckout);
			}

			const price = shopping.products?.price || 0;

			existingCheckout.shopping_products.push({
			  title: shopping.products?.title || "Unknown title",
			  state: shopping.state,
			  quantity: shopping.quantity,
			  price,
			});

			existingCheckout.total += shopping.quantity * (price || 0);
		
			return acc;
		  }, []);
		
		  return grouped;
	}
	
}
