import { DataSource, QueryRunner } from "typeorm";
import { Shopping, StateShopping } from "../entity/Shopping.entity";
import { Checkout, StatusCheckout } from "../entity/Checkout.entity";
import { Product } from "../entity/Product.entity";
import { checkoutRepository } from "../repositories/checkout.repository";

export class CheckoutService {
	constructor(private dataSource: DataSource) {}

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

			// Simular el pago
			const paymentResponse = await this.simulatePayment();

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
				} else {
					shopping.state = StateShopping.CANCELLED;
					checkout.status = StatusCheckout.DECLINED;
				}

				await queryRunner.manager.save(Shopping, shopping);

				checkout.shopping_user = shopping.user_id;
				checkout.shopping_products = shopping.products_id;
				const savedCheckout = await queryRunner.manager.save(Checkout,checkout);
				checkoutRecords.push(savedCheckout);
			}

			await queryRunner.commitTransaction();
			return checkoutRecords;
		} catch (error) {
			console.error("Error in createCheckout: ", error);
			await queryRunner.rollbackTransaction();
			throw new Error("Error creating checkout");
		} finally {
			await queryRunner.release();
		}
	}

	// Simulación de un servicio de pago externo
	private async simulatePayment(): Promise<{ status: string }> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ status: "success" }); // declined
			}, 1000);
		});
	}

    async getAllCheckout():Promise<Checkout[]> {
        return await checkoutRepository.find()
    }

    async getCheckoutsWithStatus(status: StatusCheckout): Promise<Checkout[]> {
        return await checkoutRepository.find({ where: { status } });
    }

    async getCheckoutById(id: number): Promise<Checkout | null> {
        return await checkoutRepository.findOne({ where: {id_checkout: id} });
    }

    async getCheckoutByUser(user: number): Promise<Checkout[]> {
        return await checkoutRepository.find({ where: { shopping_user: user } });
    }

    async getCheckoutByProduct(product: number): Promise<Checkout[]> {
        return await checkoutRepository.find({ where: { shopping_products: product } });
    }
}
