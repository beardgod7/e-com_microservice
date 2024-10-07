import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../database/pg_configdev'; 
import CartAttributes from './cartinterface';




export interface CartCreationAttributes
  extends Optional<CartAttributes, 'id' | 'createdAt' | 'updatedAt'> {}


class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: number;
  public userId!: number;
  public totalPrice!: number;
  public quantity!: number;
  public products!: {
      quantity: number; productName: string; price: number 
}[]; 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    products: {
      type: DataTypes.JSONB, 
      allowNull: false,
      defaultValue: [],
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, 
    tableName: 'carts',
    modelName: 'Cart',
    timestamps: true,
  }
);

export { Cart };
