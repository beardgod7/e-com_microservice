"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductConsumer = void 0;
const amqconfing_1 = __importDefault(require("../utils/amqconfing"));
class ProductPublisher {
    static async sendProductInfo(productInfo) {
        try {
            const channel = await amqconfing_1.default.createChannel();
            const exchange = 'product_exchange';
            await channel.assertExchange(exchange, 'direct', { durable: true });
            channel.publish(exchange, '', Buffer.from(JSON.stringify(productInfo)));
            console.log('Product Info sent to RabbitMQ');
        }
        catch (error) {
            console.error('Error in sending product info', error);
        }
    }
}
exports.default = ProductPublisher;
class ProductConsumer {
    static async consumeProductInfo() {
        try {
            const channel = await amqconfing_1.default.createChannel();
            const queue = 'product_queue';
            await channel.assertQueue(queue, { durable: true });
            console.log('Waiting for messages in product_queue...');
            channel.consume(queue, (msg) => {
                if (msg) {
                    const productInfo = JSON.parse(msg.content.toString());
                    console.log('Received product info:', productInfo);
                    channel.ack(msg);
                }
            });
        }
        catch (error) {
            console.error('Error in consuming product info', error);
        }
    }
}
exports.ProductConsumer = ProductConsumer;
