"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paymentservice_1 = __importDefault(require("../service/paymentservice"));
class PaymentController {
    async createPayment(req, res, next) {
        try {
            const { userId, orderId, amount, paymentMethod } = req.body;
            const payment = await paymentservice_1.default.createPayment({ userId, orderId, amount, paymentMethod });
            res.status(201).json({
                success: true,
                data: payment
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updatePayment(req, res, next) {
        try {
            const { paymentId, status } = req.body;
            const updatedPayment = await paymentservice_1.default.updatePaymentStatus(paymentId, status);
            res.status(200).json({
                success: true,
                data: updatedPayment
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new PaymentController();
