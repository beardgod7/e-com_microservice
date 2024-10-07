"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errorhandler_1 = __importDefault(require("../utils/Errorhandler"));
const Sanitizer_1 = __importDefault(require("../utils/Sanitizer"));
//import RabbitMQPublisher from '../utils/messagebroker'
class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async createProduct(data) {
        const { name, price, description, stocks, category } = data;
        const sanitizedProductName = Sanitizer_1.default.sanitizeProductName(name);
        const sanitizedDescription = Sanitizer_1.default.sanitizeDescription(description);
        const sanitizedPrice = Sanitizer_1.default.sanitizePrice(price);
        const sanitizedStocks = Sanitizer_1.default.sanitizeStock(stocks);
        const sanitizedCategory = Sanitizer_1.default.sanitizeCategory(category);
        const existingProduct = await this.productModel.findOne({ where: { name: sanitizedProductName } });
        if (existingProduct) {
            existingProduct.stocks += sanitizedStocks;
            await existingProduct.save();
            return existingProduct;
        }
        const newProduct = new this.productModel({
            name: sanitizedProductName,
            price: sanitizedPrice,
            description: sanitizedDescription,
            stocks: sanitizedStocks,
            category: sanitizedCategory,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        // await RabbitMQPublisher.publishProductInfo(newProduct)
        await newProduct.save();
        return newProduct;
    }
    async reduceStock(productId, quantity) {
        const product = await this.productModel.findByPk(productId);
        if (!product) {
            throw new Errorhandler_1.default('Product not found.', 404);
        }
        if (product.stocks < quantity) {
            throw new Errorhandler_1.default('Insufficient stock.', 400);
        }
        product.stocks -= quantity;
        await product.save();
        return product;
    }
    async getAllProducts() {
        return await this.productModel.findAll();
    }
    async getProductById(id) {
        const product = await this.productModel.findByPk(id);
        if (!product) {
            throw new Errorhandler_1.default('Product not found.', 404);
        }
        return product;
    }
    async updateProduct(id, data) {
        const product = await this.productModel.findByPk(id);
        if (!product) {
            throw new Errorhandler_1.default('Product not found.', 404);
        }
        const updatedData = {};
        if (data.name) {
            updatedData.name = Sanitizer_1.default.sanitizeProductName(data.name);
        }
        if (data.description) {
            updatedData.description = Sanitizer_1.default.sanitizeDescription(data.description);
        }
        if (data.price) {
            updatedData.price = Sanitizer_1.default.sanitizePrice(data.price);
        }
        await product.update(updatedData);
        return product;
    }
    async deleteProduct(id) {
        const product = await this.productModel.findByPk(id);
        if (!product) {
            throw new Errorhandler_1.default('Product not found.', 404);
        }
        await product.destroy();
        return true;
    }
}
exports.default = ProductService;
