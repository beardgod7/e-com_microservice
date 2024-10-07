"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const order_pg_1 = __importDefault(require("../model/order/order_pg")); // Ensure correct path
const messagebroker_1 = __importDefault(require("../utils/messagebroker")); // Ensure correct path
class OrderService extends events_1.EventEmitter {
    constructor(orderRabbitMQService) {
        super();
        this.orderRabbitMQService = orderRabbitMQService;
        this.orderRabbitMQService.on('createOrder', this.createOrder.bind(this));
    }
    async createOrder(orderData) {
        try {
            const { productData, userData } = orderData;
            const totalPrice = productData.price * productData.quantity;
            const newOrder = await order_pg_1.default.create({
                productId: productData.id,
                userId: userData.id,
                quantity: productData.quantity,
                totalAmount: totalPrice,
            });
            console.log('Order created successfully:', newOrder);
        }
        catch (error) {
            console.error('Error creating order:', error);
        }
    }
}
exports.default = new OrderService(messagebroker_1.default);
