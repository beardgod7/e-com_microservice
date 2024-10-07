"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderservice_1 = __importDefault(require("../service/orderservice")); // Ensure correct path
class OrderController {
    async createOrder(req, res) {
        try {
            const { productData, userData } = req.body;
            if (!productData ||
                typeof productData.id !== 'number' ||
                typeof productData.price !== 'number' ||
                typeof productData.quantity !== 'number' ||
                typeof productData.name !== 'string' ||
                !productData.name.trim()) {
                res.status(400).json({ message: 'Invalid product data' });
                return;
            }
            if (!userData ||
                typeof userData.id !== 'number' ||
                typeof userData.name !== 'string' ||
                !userData.name.trim() ||
                typeof userData.address !== 'string' ||
                !userData.address.trim()) {
                res.status(400).json({ message: 'Invalid user data' });
                return;
            }
            await orderservice_1.default.createOrder({ productData, userData });
            res.status(201).json({ message: 'Order created successfully' });
        }
        catch (error) {
            console.error('Error creating order:', error);
        }
    }
}
exports.default = new OrderController();
