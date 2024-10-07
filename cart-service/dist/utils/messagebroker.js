"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderConsumer = void 0;
const amqconfing_1 = __importDefault(require("../utils/amqconfing"));
class OrderPublisher {
    static async sendOrderInfo(orderInfo) {
        try {
            const channel = await amqconfing_1.default.createChannel();
            const exchange = 'order_exchange';
            await channel.assertExchange(exchange, 'direct', { durable: true });
            channel.publish(exchange, '', Buffer.from(JSON.stringify(orderInfo)));
            console.log('Order Info sent to RabbitMQ');
        }
        catch (error) {
            console.error('Error in sending order info', error);
        }
    }
}
exports.default = OrderPublisher;
class OrderConsumer {
    static async consumeOrderInfo() {
        try {
            const channel = await amqconfing_1.default.createChannel();
            const queue = 'order_queue';
            await channel.assertQueue(queue, { durable: true });
            console.log('Waiting for messages in order_queue...');
            channel.consume(queue, (msg) => {
                if (msg) {
                    const orderInfo = JSON.parse(msg.content.toString());
                    console.log('Received order info:', orderInfo);
                    channel.ack(msg);
                }
            });
        }
        catch (error) {
            console.error('Error in consuming order info', error);
        }
    }
}
exports.OrderConsumer = OrderConsumer;
