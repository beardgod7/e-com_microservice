"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_pg_1 = __importDefault(require("../model/payment/payment_pg"));
class PaymentService {
    async createPayment(data) {
        const payment = await payment_pg_1.default.create({
            userId: data.userId,
            orderId: data.orderId,
            amount: data.amount,
            paymentMethod: data.paymentMethod,
            status: 'pending'
        });
        return payment;
    }
    async getPaymentById(paymentId) {
        return payment_pg_1.default.findByPk(paymentId);
    }
    async updatePaymentStatus(paymentId, status) {
        const payment = await payment_pg_1.default.findByPk(paymentId);
        if (payment) {
            payment.status = status;
            await payment.save();
            return payment;
        }
        throw new Error('Payment not found');
    }
}
exports.default = new PaymentService();
