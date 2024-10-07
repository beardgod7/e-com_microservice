import { DataTypes, Model} from 'sequelize';
import sequelize from '../../database/pg_configdev';

class Payment extends Model {
  public id!: string;
  public userId!: string;
  public orderId!: string;
  public amount!: number;
  public paymentMethod!: string;
  public status!: string;
}

Payment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  sequelize,
  modelName: 'Payment',
  timestamps: true
});

export default Payment;
