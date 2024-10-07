"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const events_1 = require("events");
class OrderRabbitMQService extends events_1.EventEmitter {
    constructor() {
        super();
        this.connection = null;
        this.channel = null;
        this.productData = null;
        this.userData = null;
        this.connect();
    }
    async connect() {
        try {
            this.connection = await amqplib_1.default.connect('amqp://localhost');
            this.channel = await this.connection.createChannel();
            const productExchange = 'product_exchange';
            const userExchange = 'user_exchange';
            const productQueue = 'product_queue';
            const userQueue = 'user_queue';
            await this.channel.assertExchange(productExchange, 'direct', { durable: true });
            await this.channel.assertQueue(productQueue, { durable: true });
            await this.channel.bindQueue(productQueue, productExchange, 'product_key');
            await this.channel.assertExchange(userExchange, 'direct', { durable: true });
            await this.channel.assertQueue(userQueue, { durable: true });
            await this.channel.bindQueue(userQueue, userExchange, 'user_key');
            this.channel.consume(productQueue, (msg) => {
                if (msg) {
                    const data = JSON.parse(msg.content.toString());
                    console.log('Product data received:', data);
                    this.productData = data;
                    this.checkAndCreateOrder();
                }
            });
            this.channel.consume(userQueue, (msg) => {
                if (msg) {
                    const data = JSON.parse(msg.content.toString());
                    console.log('User data received:', data);
                    this.userData = data;
                    this.checkAndCreateOrder();
                }
            });
        }
        catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
        }
    }
    async checkAndCreateOrder() {
        if (this.productData && this.userData) {
            try {
                this.emit('createOrder', { productData: this.productData, userData: this.userData });
                this.productData = null;
                this.userData = null;
            }
            catch (error) {
                console.error('Error handling order creation:', error);
            }
        }
    }
}
exports.default = new OrderRabbitMQService();
