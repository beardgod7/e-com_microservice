import RabbitMQ from './amqconfing';

class OrderPublisher {
  public static async sendOrderInfo(orderInfo: any) {
    try {
      const channel = await RabbitMQ.createChannel();
      const exchange = 'order_exchange';
      await channel.assertExchange(exchange, 'direct', { durable: true });

      channel.publish(exchange, '', Buffer.from(JSON.stringify(orderInfo)));
      console.log('Order Info sent to RabbitMQ');
    } catch (error) {
      console.error('Error in sending order info', error);
    }
  }
}

export default OrderPublisher;



export class OrderConsumer {
  public static async consumeOrderInfo() {
    try {
      const channel = await RabbitMQ.createChannel();
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
    } catch (error) {
      console.error('Error in consuming order info', error);
    }
  }
}