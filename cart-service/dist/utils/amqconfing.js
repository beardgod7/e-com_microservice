"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQ {
    static async getConnection() {
        if (!this.connection) {
            try {
                this.connection = await amqplib_1.default.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
                console.log('RabbitMQ Connected');
            }
            catch (error) {
                console.error('Failed to connect to RabbitMQ', error);
                throw error;
            }
        }
        return this.connection;
    }
    static async createChannel() {
        const connection = await this.getConnection();
        const channel = await connection.createChannel();
        return channel;
    }
    static async closeConnection() {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
        }
    }
}
RabbitMQ.connection = null;
exports.default = RabbitMQ;
