import { Request, Response, NextFunction } from "express";
import { CheckoutService } from "../services/checkout.service";
import { AppDataSource } from "../config/db-config";
import ControllerHandler from "../handlers/controllers.handler";
import { StatusCheckout } from "../entity/Checkout.entity";

/**
 * @swagger
 * components:
 *   schemas:
 *     Checkout:
 *       type: object
 *       required:
 *         - status
 *         - date_checkout
 *         - shopping_user
 *         - shopping_products
 *       properties:
 *         id_checkout:
 *           type: integer
 *           description: The unique identifier for the checkout entry
 *         status:
 *           type: string
 *           description: The status of the checkout, can be either "PAID" or "DECLINED"
 *           enum:
 *             - "PAID"
 *             - "DECLINED"
 *         date_checkout:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the checkout was made
 *           default: CURRENT_TIMESTAMP
 *         shopping_user:
 *           type: integer
 *           description: The user ID associated with this checkout
 *         shopping_products:
 *           type: integer
 *           description: The product ID associated with this checkout
 *         shopping:
 *           $ref: '#/components/schemas/Shopping'  # Reference to the Shopping schema
 *       example:
 *         id_checkout: 1
 *         status: "PAID"
 *         date_checkout: "2024-11-26T12:00:00Z"
 *         shopping_user: 1
 *         shopping_products: 101
 *         shopping:
 *           - user_id: 1
 *             products_id: 101
 *             state: "PENDING"
 *             quantity: 2
 *             users:
 *               id_users: 1
 *               name: "John Doe"
 *               email: "johndoe@example.com"
 *               active: true
 *               role: "USER"
 *             products:
 *               id_product: 101
 *               title: "Laptop"
 *               price: 1200.50
 *               available: true
 *               description: "High-end gaming laptop"
 *               type: "Electronics"
 *               image: "laptop.jpg"
 *               genre: "Technology"
 *               stock: 50
 */

export class CheckoutController {

    private readonly checkoutService: CheckoutService;

    constructor () {
        this.checkoutService = new CheckoutService(AppDataSource);
        this.getAllCheckoutController = this.getAllCheckoutController.bind(this);
        this.getCheckoutByIdController = this.getCheckoutByIdController.bind(this);
        this.getCheckoutsWithStatusController = this.getCheckoutsWithStatusController.bind(this);
        this.getCheckoutByUserController = this.getCheckoutByUserController.bind(this);
        this.getCheckoutByProductController = this.getCheckoutByProductController.bind(this);
        this.createOrderController = this.createOrderController.bind(this);
        this.captureOrderController = this.captureOrderController.bind(this);
    }

    async getAllCheckoutController(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const checkouts = await this.checkoutService.getAllCheckout();
            if(!checkouts || checkouts.length === 0) return ControllerHandler.ok("No checkout data available", res, []);
            return ControllerHandler.ok("All checkouts retrieved successfully", res, checkouts)    
        } catch (error) {
            next(error);
        }
    }

    async getCheckoutByIdController (req: Request, res: Response, next: NextFunction):Promise<any> {
        const id = req.params.id;
        try {
            const checkout = await this.checkoutService.getCheckoutById(id);
            if (!checkout) return ControllerHandler.notFound("Checkout not found", res);
            return ControllerHandler.ok("Checkout retrieved successfully", res, checkout);
        } catch (error) {
            next(error);
        }
    }

    async getCheckoutsWithStatusController(req: Request, res: Response, next: NextFunction):Promise<any> {
        const status = req.params.status as StatusCheckout;
        if (!Object.values(StatusCheckout).includes(status)) return ControllerHandler.notFound("Invalid status", res);
        try {
            const checkouts = await this.checkoutService.getCheckoutsWithStatus(status);
            if (!checkouts || checkouts.length === 0) 
                return ControllerHandler.ok("No checkouts found with the specified status", res, []);
            return ControllerHandler.ok("Checkouts retrieved successfully", res, checkouts);
        } catch (error) {
            next(error);
        }
    }

    async getCheckoutByUserController(req: Request, res: Response, next: NextFunction):Promise<any> {
        const user = parseInt(req.params.user);
        try {
            const checkouts = await this.checkoutService.getCheckoutByUser(user);
            if (!checkouts || checkouts.length === 0)
                return ControllerHandler.ok("No checkouts found for the specified user", res, []);
            return ControllerHandler.ok("User's checkouts retrieved successfully", res, checkouts);
        } catch (error) {
            next(error);
        }
    }

    async getCheckoutByProductController(req: Request, res: Response, next: NextFunction):Promise<any> {
        const product = parseInt(req.params.product);
        try {
            const checkouts = await this.checkoutService.getCheckoutByProduct(product);
            if (!checkouts || checkouts.length === 0)
                return ControllerHandler.ok("No checkouts found for the specified product", res, []);
            return ControllerHandler.ok("Product's checkouts retrieved successfully", res, checkouts);
        } catch (error) {
            next(error);
        }
    }

    async createOrderController(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { shopping, amount } = req.body;
        if (!shopping || !amount) return ControllerHandler.badRequest("Mandatory parameters missing: shopping and amount", res);
        try {
            const order = await this.checkoutService.createOrder(shopping, amount);
            return ControllerHandler.ok("Order created successfully", res, order);
        } catch (error) {
            next(error);
        }
    }

    async captureOrderController(req: Request, res: Response, next: NextFunction): Promise<any> {
        const token = req.query.token as string;
        const payerID = req.query.PayerID as string;
        if (!token || !payerID) return ControllerHandler.badRequest("Token and PayerID are required", res);
        try {
            const checkoutRecords = await this.checkoutService.captureOrder(token, payerID);
            return ControllerHandler.ok("Order captured successfully", res, checkoutRecords);
        } catch (error) {
            next(error);
        }
    }

    async cancelOrderController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.query;
            if (!id) return ControllerHandler.badRequest("Order ID is required", res);
            return ControllerHandler.ok(`Order with ID ${id} has been canceled.`, res)
        } catch (error) {
            next(error);
        }
    }

}