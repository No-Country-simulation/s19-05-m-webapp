import { Request, Response, NextFunction } from "express";
import { ShoppingService } from "../services/shopping.service";
import ControllerHandler from "../handlers/controllers.handler";
import { Shopping } from "../entity/Shopping.entity";
import { AppDataSource } from "../config/db-config";
import { CheckoutService } from "../services/checkout.service";

/**
 * @swagger
 * components:
 *   schemas:
 *     Shopping:
 *       type: object
 *       required:
 *         - user_id
 *         - products_id
 *         - state
 *         - quantity
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The ID of the user associated with the shopping
 *         products_id:
 *           type: integer
 *           description: The ID of the product in the shopping cart
 *         state:
 *           type: string
 *           description: The state of the shopping, can be "PENDING", "COMPLETED", or "CANCELLED"
 *           enum:
 *             - "PENDING"
 *             - "COMPLETED"
 *             - "CANCELLED"
 *           default: "PENDING"
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the shopping cart
 *         users:
 *           $ref: '#/components/schemas/User'  # Referencia al esquema de la entidad User
 *         products:
 *           $ref: '#/components/schemas/Product'  # Referencia al esquema de la entidad Product
 *         checkout:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Checkout'  # Referencia al esquema de la entidad Checkout
 *       example:
 *         user_id: 1
 *         products_id: 101
 *         state: "PENDING"
 *         quantity: 2
 */
export class ShoppingController {
	
	private readonly shoppingService: ShoppingService;

	constructor() {

		const checkoutService = new CheckoutService(AppDataSource);
		this.shoppingService = new ShoppingService(checkoutService);

		this.paymentPurchasesController = this.paymentPurchasesController.bind(this);
		this.getAllShoppingController = this.getAllShoppingController.bind(this);
		this.createShoppingController = this.createShoppingController.bind(this);
		this.updateShoppingController = this.updateShoppingController.bind(this);
		this.deleteShoppingController = this.deleteShoppingController.bind(this);
	}

	async getAllShoppingController(req: Request, res: Response, next: NextFunction): Promise<any> {
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
						platform: shopping.products.platforms ? shopping.products.platforms : "No platform specified",
						state: shopping.state
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
								quantity: shopping.quantity,
								platform: shopping.products.platforms ? shopping.products.platforms : "No platform specified",
								state: shopping.state,
							},
						]
					});
				}
			});
	
			const formatted = Array.from(userProductsMap.values());

			return ControllerHandler.ok("Shoppings retrieved successfully", res, formatted);

		} catch (error) {
			next(error);
		}
	}

	async createShoppingController( req: Request, res: Response, next: NextFunction): Promise<any> {
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

	async updateShoppingController(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
            
			const { user, product } = req.params;

			const user_id = parseInt(user, 10);
			const product_id = parseInt(product, 10);

			if (isNaN(user_id) || isNaN(product_id)) {
				return ControllerHandler.badRequest("User ID and Product ID must be valid numbers",res);
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

	async deleteShoppingController(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {

			const { user, product } = req.params;
			const user_id = parseInt(user, 10);
			const product_id = parseInt(product, 10);
			if (isNaN(user_id) || isNaN(product_id)) return ControllerHandler.badRequest("User ID and Product ID must be valid numbers",res);
			const deletedShopping = await this.shoppingService.deleteShopping(user_id, product_id);
			return ControllerHandler.ok("Shopping deleted successfully", res, deletedShopping);

		} catch(error){
			next(error);
		}
	}

	async paymentPurchasesController(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const { user } = req.params;
			const user_id = parseInt(user, 10);
			if(isNaN(user_id)) return ControllerHandler.badRequest("User ID is required and must be a valid number", res);
			const payment = await this.shoppingService.paymentPurchases(user_id);
			return ControllerHandler.ok("Payment processed successfully", res, payment);
		} catch (error) {
			next(error);
		}
	}
}
