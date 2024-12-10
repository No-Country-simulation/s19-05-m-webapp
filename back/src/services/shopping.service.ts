import { Shopping, StateShopping } from "../entity/Shopping.entity";
import { shoppingRepository } from "../repositories/shopping.repository";
import { Checkout } from "../entity/Checkout.entity";
import { CheckoutService } from "./checkout.service";
import { productRepository } from "../repositories/product.repository";

export class ShoppingService {
	constructor(private checkoutService: CheckoutService) {}

	//listar todas las compras
	async getAllShopping(): Promise<Shopping[]> {
		return await shoppingRepository.find({ relations: ["users", "products"] });
	}

	async getShoppingByUserId(id: number): Promise<Shopping[]> {
		return await shoppingRepository.find({ where: { user_id: id }, relations: ["users", "products"] });
	}

	async createShopping(data: {user_id: number;products_id: number;quantity: number;}) {
		try {

			const pendingShopping = await shoppingRepository.findOne({
				where: { user_id: data.user_id, state: StateShopping.PENDING },
			});

			if (pendingShopping) {

				const existingShopping = await shoppingRepository.findOne({
					where: {
						user_id: data.user_id,
						products_id: data.products_id,
					},
				});

				if (existingShopping) {
					if (existingShopping.state !== StateShopping.PENDING) {
						existingShopping.state = StateShopping.PENDING;
						await shoppingRepository.save(existingShopping);
					} else {
						throw new Error("A shopping entry with this user and product already exists in PENDING state");
					}
				}
			} else {
				const existingShopping = await shoppingRepository.findOne({
					where: {
						user_id: data.user_id,
						products_id: data.products_id,
					},
				});

				if (existingShopping) {
					if (existingShopping.state !== StateShopping.PENDING) {
						existingShopping.state = StateShopping.PENDING;
						await shoppingRepository.save(existingShopping);
					} else {
						throw new Error("A shopping entry with this user and product already exists in PENDING state");
					}
				}
			}

			const existingProductInStock = await productRepository.findOne({
				where: { id_product: data.products_id },
			});
			if (!existingProductInStock) throw new Error("Product not found");

			if (existingProductInStock.stock < data.quantity) {
				throw new Error(
					`Not enough stock. In stock ${existingProductInStock.stock}, required: ${data.quantity}`
				);
			}

			const shoppingData = {
				user_id: data.user_id,
				products_id: data.products_id,
				quantity: data.quantity,
			};

			const addedShopping = await shoppingRepository.save(shoppingData);

			return addedShopping;
		} catch (error) {
			console.error("Error creating shopping: ", error);
			throw new Error("Error creating shopping");
		}
	}

	async updateShopping(user: number, product: number,data: Partial<{ quantity: number }>) {
		try {
			const shoppingRecord = await shoppingRepository.findOne({
				where: { user_id: user, products_id: product },
				relations: ["products"],
			});

			if (!shoppingRecord)
				throw new Error(`Shopping entry with user_id: ${user} and products_id: ${product} not found`);

			const record = shoppingRecord.products;
			if (!record) throw new Error(`Product with id: ${product} not found`);

			const current = shoppingRecord.quantity;
			const registered = data.quantity;

			if (registered !== undefined) {
				if (registered > current) {
					const difference = registered - current;
					if (record.stock < difference)
						throw new Error(`Not enough stock to increase quantity. Available: ${record.stock}, Required: ${difference}`);
				}
			}

			if (registered === 0) {
				await shoppingRepository.remove(shoppingRecord);
				console.info(`Shopping record for user ${user} and product ${product} has been deleted because quantity is 0.`);
				return null;
			}
			if (registered !== undefined) shoppingRecord.quantity = registered;

			await shoppingRepository.save(shoppingRecord);

			return shoppingRepository.findOne({ where: { user_id: user, products_id: product } });
		} catch (error) {
			console.error("Error in updateShopping: ", error);
			throw new Error("Error updating shopping");
		}
	}

    async deleteShopping(user: number, product: number): Promise<Shopping | null> {
        try {

            const shoppingRecord = await shoppingRepository.findOne({
                where: { user_id: user, products_id: product },
            });
    
            if (!shoppingRecord) {
                console.warn(`Shopping record for user_id: ${user} and products_id: ${product} not found.`);
                return null;
            }

            await shoppingRepository.remove(shoppingRecord);
            console.info(`Shopping record for user_id: ${user} and products_id: ${product} has been deleted.`);

            return shoppingRecord;

        } catch (error) {
            console.error("Error in deleteShopping: ", error);
            throw new Error("Error deleting shopping record");
        }
    }

    async paymentPurchases(user: number): Promise<Checkout[]> {
		return await this.checkoutService.createCheckout(user);
	}
}
