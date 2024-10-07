import { Request, Response, NextFunction } from 'express';
import PaymentService from '../service/paymentservice';

class PaymentController {
  public async createPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, orderId, amount, paymentMethod } = req.body;
      const payment = await PaymentService.createPayment({ userId, orderId, amount, paymentMethod });
      res.status(201).json({
        success: true,
        data: payment
      });
    } catch (error) {
      next(error);
    }
  }

  public async updatePayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { paymentId, status } = req.body;
      const updatedPayment = await PaymentService.updatePaymentStatus(paymentId, status);
      res.status(200).json({
        success: true,
        data: updatedPayment
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PaymentController();
