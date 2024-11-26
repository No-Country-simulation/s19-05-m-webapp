import { AppDataSource } from "../config/db-config";
import { Product } from "../entity/Product.entity";
import { Shopping, StateShopping } from "../entity/Shopping.entity";
import { shoppingRepository } from "../repositories/shopping.repository";

export class ShoppingService {

    //listar todas las compras
    async getAllShopping(): Promise<Shopping[]> {
        return await shoppingRepository.find({ relations: ["users", "products"] });
    }

    async createShopping(data: {user_id: number, products_id: number, quantity: number}){
        try {

            const productRepository = AppDataSource.getRepository(Product);

            const existingShopping = await shoppingRepository.findOne({ 
                where: { user_id: data.user_id, products_id: data.products_id } 
            });
            if (existingShopping) throw new Error("A shopping entry with this user and product already exists");
            
            const existingProductInStock = await productRepository.findOne({ where: { id_product: data.products_id } });
            if(!existingProductInStock) throw new Error("Product not found");
            if(existingProductInStock.stock < data.quantity) 
                throw new Error(`Not enough stock. In stock ${existingProductInStock.stock}, required: ${data.quantity}`);

            const shoppingData = {
                user_id: data.user_id,
                products_id: data.products_id,
                quantity: data.quantity
            };

            const addedShopping = await shoppingRepository.save(shoppingData);
    
            return addedShopping;
            // product.stock -= data.quantity;
            // await productRepository.save(product);

        } catch (error) {
            console.error("Error creating shopping: ", error);
            throw new Error("Error creating shopping");
        }
    }

    async updateShopping(user: number, product: number, data: Partial<{ quantity: number }>){
        try {

            const shoppingRecord = await shoppingRepository.findOne({ 
                where: { user_id: user, products_id: product },
                relations : ["products"]
            });

            if (!shoppingRecord) throw new Error(`Shopping entry with user_id: ${user} and products_id: ${product} not found`);
            
            const record = shoppingRecord.products;
            if(!record) throw new Error(`Product with id: ${product} not found`);

            const current = shoppingRecord.quantity;
            const registered = data.quantity;

            if(registered !== undefined){
                if(registered > current){
                    const difference = registered - current;
                    if(record.stock < difference) throw new Error(`Not enough stock to increase quantity. Available: ${record.stock}, Required: ${difference}`);
                }
            }

            if(registered === 0){
                await shoppingRepository.remove(shoppingRecord);
                console.info(`Shopping record for user ${user} and product ${product} has been deleted because quantity is 0.`);
                return null;
            }
            if(registered !== undefined) shoppingRecord.quantity = registered;

            await shoppingRepository.save(shoppingRecord);

            return shoppingRepository.findOne({
                where: { user_id: user, products_id: product }
            });
            
        } catch (error) {
            console.error("Error in updateShopping: ", error);
            throw new Error("Error updating shopping");
        }
    }

    // Simulación de un servicio de pago externo
    private async simulatePayment(): Promise<{ status: string }> {
        return new Promise((resolve) => {
            setTimeout(() => {
            resolve({ status: "success" }); // Simula un pago exitoso
            }, 1000);
        });
    }

    async paymentPurchases(user: number):Promise<any> {

        try {
            // Simulación del estado del pago
            const paymentResponse = await this.simulatePayment();
      
            if (paymentResponse.status !== "success") {
              throw new Error("Payment failed. Cannot update shopping status.");
            }

            const pendingShoppings = await shoppingRepository.find({
              where: { user_id: user, state: StateShopping.PENDING },
            });
      
            if (!pendingShoppings || pendingShoppings.length === 0) throw new Error(`No pending shopping records found for user ID ${user}.`);
      
            for (const shopping of pendingShoppings) {
              shopping.state = StateShopping.COMPLETED;
              await shoppingRepository.save(shopping);
            }
      
            return {
              message: "Payment successful. Shopping statuses updated to 'COMPLETED'.",
              updatedRecords: pendingShoppings,
            };
            
          } catch (error) {
            console.error("Error in paymentPurchases:", error);
            throw new Error("An unexpected error occurred.");
          }

    }
}