import amqp from 'amqplib';

class RabbitMQ {
  private static connection: amqp.Connection | null = null;

  public static async getConnection(): Promise<amqp.Connection> {
    if (!this.connection) {
      try {
        this.connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        console.log('RabbitMQ Connected');
      } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
        throw error;
      }
    }
    return this.connection;
  }

  public static async createChannel(): Promise<amqp.Channel> {
    const connection = await this.getConnection();
    const channel = await connection.createChannel();
    return channel;
  }

  public static async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}

export default RabbitMQ;
