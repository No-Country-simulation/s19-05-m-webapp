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
			return ControllerHandler.ok(
				"Shoppings retrieved successfully",
				res,
				shoppings
			);
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
			const shoppingData: Partial<Shopping> = req.body;

			if (
				!shoppingData.user_id ||
				typeof shoppingData.user_id !== "number"
			)
				return ControllerHandler.badRequest("User ID is required", res);

			if (
				!shoppingData.products_id ||
				typeof shoppingData.products_id !== "number"
			)
				return ControllerHandler.badRequest(
					"Product ID is required",
					res
				);

			const newShopping = await this.shoppingService.createShopping(
				shoppingData
			);
			return ControllerHandler.ok(
				"Shopping created successfully",
				res,
				newShopping
			);
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
