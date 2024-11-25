import { Request, Response, NextFunction } from "express";
import { ShoppingService } from "../services/shopping.service";
import ControllerHandler from "../handlers/controllers.handler";
import { Shopping } from "../entity/Shopping.entity";

export class ShoppingController {
	private readonly shoppingService: ShoppingService;

	constructor() {
		this.shoppingService = new ShoppingService();

		this.getAllShoppingController =
			this.getAllShoppingController.bind(this);
		this.createShoppingController =
			this.createShoppingController.bind(this);
		this.updateShoppingController =
			this.updateShoppingController.bind(this);
	}

	async getAllShoppingController(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> {
		try {
			
			const shoppings = await this.shoppingService.getAllShopping();

			if (!shoppings || shoppings.length === 0) return ControllerHandler.ok("No shopping data available", res, []);
	
			const userProductsMap = new Map<string, any>();
	
			shoppings.forEach((shopping) => {
				const key = shopping.users.email;
	
				if (!key) {
					console.warn("Skipping shopping record with missing user email:", shopping);
					return;
				}
	
				if (userProductsMap.has(key)) {
					
					const entry = userProductsMap.get(key);

					entry.products.push({
						name: shopping.products.title,
						image: shopping.products.image,
						description: shopping.products.description,
						price: shopping.products.price,
						genre: shopping.products.genre,
						quantity: shopping.quantity,
						state: shopping.state,
						// platform: shopping.products.platforms
					});

				} else {
					userProductsMap.set(key, {
						user: {
							name: shopping.users.name,
							phone: shopping.users.phone,
							email: shopping.users.email,
							address: shopping.users.address,
						},
						products: [
							{
								name: shopping.products.title,
								image: shopping.products.image,
								description: shopping.products.description,
								price: shopping.products.price,
								genre: shopping.products.genre,
								quanity: shopping.quantity,
								state: shopping.state,
								// platform: shopping.products.platforms
							},
						],
						date: shopping.date_shopping
					});
				}
			});
	
			const formatted = Array.from(userProductsMap.values());

			return ControllerHandler.ok("Shoppings retrieved successfully", res, formatted);

		} catch (error) {
			next(error);
		}
	}

	async createShoppingController(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> {
		try {

			const {user_id, products_id, quantity} = req.body;

			if (!user_id || typeof user_id !== "number")
				return ControllerHandler.badRequest("User ID is required", res);

			if (!products_id || typeof products_id !== "number")
				return ControllerHandler.badRequest("Product ID is required",res);

			if(!quantity || typeof quantity !== "number")
				return ControllerHandler.badRequest("Quantity is required", res);

			const newShopping = await this.shoppingService.createShopping({ user_id, products_id, quantity });

			return ControllerHandler.ok("Shopping created successfully", res, newShopping);

		} catch (error) {
			next(error);
		}
	}

	async updateShoppingController(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> {
		try {
            
			const { user, product } = req.params;

			const user_id = parseInt(user, 10);
			const product_id = parseInt(product, 10);

			if (isNaN(user_id) || isNaN(product_id)) {
				return ControllerHandler.badRequest(
					"User ID and Product ID must be valid numbers",
					res
				);
			}

			const shoppingData: Partial<Shopping> = req.body;

			const updatedShopping = await this.shoppingService.updateShopping(
				user_id,
				product_id,
				shoppingData
			);

			if (!updatedShopping) {
				return ControllerHandler.notFound("Shopping not found", res);
			}

			return ControllerHandler.ok(
				"Shopping updated successfully",
				res,
				updatedShopping
			);
		} catch (error) {
			next(error);
		}
	}
}
