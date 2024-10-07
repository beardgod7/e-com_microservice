"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pg_configdev_1 = __importDefault(require("../../database/pg_configdev"));
class Payment extends sequelize_1.Model {
}
Payment.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    orderId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    sequelize: pg_configdev_1.default,
    modelName: 'Payment',
    timestamps: true
});
exports.default = Payment;
