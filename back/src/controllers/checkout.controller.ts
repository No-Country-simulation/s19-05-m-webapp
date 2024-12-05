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
 *         - id_checkout
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
 *           description: The status of the checkout, can be either "PAID", "PENDING" or "DECLINED"
 *           enum:
 *             - "PAID"
 *             - "PENDING"
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
 *           $ref: '#/components/schemas/Checkout'  # Reference to the Shopping schema
 *       example:
 *         id_checkout: 1
 *         status: "PAID"
 *         date_checkout: "2024-11-26T12:00:00Z"
 *         shopping_user: 1
 *         shopping_products: 101
 */

export class CheckoutController {

    private readonly checkoutService: CheckoutService;

    constructor () {
        this.checkoutService = new CheckoutService(AppDataSource);

        this.createOrderController = this.createOrderController.bind(this);
        this.captureOrderController = this.captureOrderController.bind(this);
        this.cancelOrderController = this.cancelOrderController.bind(this);

        this.getAllCheckoutController = this.getAllCheckoutController.bind(this);
        this.getCheckoutByIdController = this.getCheckoutByIdController.bind(this);
        this.getCheckoutsByStatusController = this.getCheckoutsByStatusController.bind(this);
        this.getCheckoutsByUserController = this.getCheckoutsByUserController.bind(this);
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
        const token = req.query.token as string;
        try {
            if (!token) return ControllerHandler.badRequest("Order ID is required", res);
            const order = await this.checkoutService.cancelOrder(token);
            if(order.length === 0)
                return ControllerHandler.badRequest("No orders found to cancel.", res);
        } catch (error) {
            next(error);
        }
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

    async getCheckoutsByStatusController(req: Request, res: Response, next: NextFunction):Promise<any> {
        const { status } = req.params;
        try {
            const checkoutStatus = await this.checkoutService.getCheckoutsByStatus(status as StatusCheckout);
            return ControllerHandler.ok("Checkouts retrieved successfully", res, checkoutStatus);
        } catch (error) {
            next(error)
        }
    }

    async getCheckoutsByUserController(req: Request, res: Response, next: NextFunction):Promise<any> {
        const { userId } = req.params;
        const user = parseInt(userId, 10)
        try {
            const checkoutUser = await this.checkoutService.getCheckoutsByUser(user);
            return ControllerHandler.ok("Checkouts retrieved successfully", res, checkoutUser);
        } catch (error) {
            next(error);
        }

    }

}