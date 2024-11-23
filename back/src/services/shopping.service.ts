import { Shopping } from "../entity/Shopping.entity";
import { shoppingRepository } from "../repositories/shopping.repository";

export class ShoppingService {

    //listar todas las compras
    async getAllShopping(): Promise<Shopping[]> {
        return await shoppingRepository.find({ relations: ["users", "products"] });
    }

    async createShopping(data: any){
        try {

            const existingShopping = await shoppingRepository.findOne({ 
                where: { user_id: data.user_id, products_id: data.products_id } 
            });
    
            if (existingShopping) throw new Error("A shopping entry with this user and product already exists");
            
            const newShopping = shoppingRepository.create(data);
            return await shoppingRepository.save(newShopping);

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