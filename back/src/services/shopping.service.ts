import { AppDataSource } from "../config/db-config";
import { Product } from "../entity/Product.entity";
import { Shopping } from "../entity/Shopping.entity";
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
            
            const product = await productRepository.findOne({ where: { id_product: data.products_id } });
            if(!product) throw new Error("Product not found");
            if(product.stock < data.quantity) 
                throw new Error(`Not enough stock. In stock ${product.stock}, required: ${data.quantity}`);

            product.stock -= data.quantity;
            await productRepository.save(product);

            const shoppingData = {
                user_id: data.user_id,
                products_id: data.products_id,
                quantity: data.quantity
            };

            const addedShopping = await shoppingRepository.save(shoppingData);
    
            return addedShopping;

        } catch (error) {
            console.error("Error creating shopping: ", error);
            throw new Error("Error creating shopping");
        }
    }

    async updateShopping(user: number, product: number, data: Partial<any>){
        try {

            const shopping = await shoppingRepository.update({ user_id: user, products_id: product }, data);
            
            if (shopping.affected === 0) throw new Error(`Shopping entry with user_id: ${user} and products_id: ${product} not found`);
    
            const updatedShopping = await shoppingRepository.findOne({
                where: { user_id: user, products_id: product },
                relations: ["users", "products"]
            });
    
            return updatedShopping;
            
        } catch (error) {
            console.error("Error updating shopping: ", error);
            throw new Error("Error updating shopping");
        }
    }
}