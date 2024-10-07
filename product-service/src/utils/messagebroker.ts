
import RabbitMQ from './amqconfing';
import { createProductDTO} from '../service/productservice-interface'
import ProductAttributes from '../model/product/productinterface';

class ProductPublisher {
  public static async sendProductInfo<T>(productInfo:T) {
    try {
      const channel = await RabbitMQ.createChannel();
      const exchange = 'product_exchange';
      await channel.assertExchange(exchange, 'direct', { durable: true });

      channel.publish(exchange, '', Buffer.from(JSON.stringify(productInfo)));
      console.log('Product Info sent to RabbitMQ');
    } catch (error) {
      console.error('Error in sending product info', error);
    }
  }
}

export default ProductPublisher;


export class ProductConsumer {
  public static async consumeProductInfo() {
    try {
      const channel = await RabbitMQ.createChannel();
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
    } catch (error) {
      console.error('Error in consuming product info', error);
    }
  }
}

