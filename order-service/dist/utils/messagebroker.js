"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentConsumer = void 0;
const amqconfing_1 = __importDefault(require("../utils/amqconfing"));
class PaymentPublisher {
    static async sendPaymentInfo(paymentInfo) {
        try {
            const channel = await amqconfing_1.default.createChannel();
            const exchange = 'payment_exchange';
            await channel.assertExchange(exchange, 'direct', { durable: true });
            channel.publish(exchange, '', Buffer.from(JSON.stringify(paymentInfo)));
            console.log('Payment Info sent to RabbitMQ');
        }
        catch (error) {
            console.error('Error in sending payment info', error);
        }
    }
}
exports.default = PaymentPublisher;
class PaymentConsumer {
    static async consumePaymentInfo() {
        try {
            const channel = await amqconfing_1.default.createChannel();
            const queue = 'payment_queue';
            await channel.assertQueue(queue, { durable: true });
            console.log('Waiting for messages in payment_queue...');
            channel.consume(queue, (msg) => {
                if (msg) {
                    const paymentInfo = JSON.parse(msg.content.toString());
                    console.log('Received payment info:', paymentInfo);
                    channel.ack(msg);
                }
            });
        }
        catch (error) {
            console.error('Error in consuming payment info', error);
        }
    }
}
exports.PaymentConsumer = PaymentConsumer;
PaymentConsumer;
