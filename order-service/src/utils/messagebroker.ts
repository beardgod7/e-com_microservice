import RabbitMQ from './amqconfing';

class PaymentPublisher {
  public static async sendPaymentInfo(paymentInfo: any) {
    try {
      const channel = await RabbitMQ.createChannel();
      const exchange = 'payment_exchange';
      await channel.assertExchange(exchange, 'direct', { durable: true });

      channel.publish(exchange, '', Buffer.from(JSON.stringify(paymentInfo)));
      console.log('Payment Info sent to RabbitMQ');
    } catch (error) {
      console.error('Error in sending payment info', error);
    }
  }
}

export default PaymentPublisher;


export class PaymentConsumer {
  public static async consumePaymentInfo() {
    try {
      const channel = await RabbitMQ.createChannel();
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
    } catch (error) {
      console.error('Error in consuming payment info', error);
    }
  }
}

 PaymentConsumer;