"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productcontroller_1 = __importDefault(require("../controller/productcontroller"));
const productservice_1 = __importDefault(require("../service/productservice"));
const product_pg_1 = __importDefault(require("../model/product/product_pg"));
const auth_1 = __importDefault(require("../middleware/auth"));
class ProductRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        const productService = new productservice_1.default(product_pg_1.default);
        this.productController = new productcontroller_1.default(productService);
        this.auth = new auth_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Adjusted routes for product management
        this.router.post('/create-product', this.productController.createProduct);
        this.router.get('/products', this.productController.getAllProducts);
        this.router.get('/product/:id', this.productController.getProductById);
        this.router.put('/product/:id', this.productController.updateProduct);
        this.router.delete('/product/:id', this.productController.deleteProduct);
    }
}
exports.default = new ProductRouter().router;
