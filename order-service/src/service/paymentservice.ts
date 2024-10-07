import Payment from '../model/payment/payment_pg';

class PaymentService {
  public async createPayment(data: { userId: string, orderId: string, amount: number, paymentMethod: string }) {
    const payment = await Payment.create({
      userId: data.userId,
      orderId: data.orderId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      status: 'pending' 
    });
    return payment;
  }

  public async getPaymentById(paymentId: string) {
    return Payment.findByPk(paymentId);
  }

  public async updatePaymentStatus(paymentId: string, status: string) {
    const payment = await Payment.findByPk(paymentId);
    if (payment) {
      payment.status = status;
      await payment.save();
      return payment;
    }
    throw new Error('Payment not found');
  }
}

export default new PaymentService();

 