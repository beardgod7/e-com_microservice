"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const sequelize_1 = require("sequelize");
const pg_configdev_1 = __importDefault(require("../../database/pg_configdev"));
class Cart extends sequelize_1.Model {
}
exports.Cart = Cart;
Cart.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    products: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: pg_configdev_1.default,
    tableName: 'carts',
    modelName: 'Cart',
    timestamps: true,
});
