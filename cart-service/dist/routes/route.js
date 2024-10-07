"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartcontroller_1 = __importDefault(require("../controller/cartcontroller"));
const cartservice_1 = __importDefault(require("../service/cartservice"));
const cart_1 = require("../model/cart/cart");
const auth_1 = __importDefault(require("../middleware/auth"));
class CartRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        const cartService = new cartservice_1.default(cart_1.Cart);
        this.cartController = new cartcontroller_1.default(cartService);
        this.auth = new auth_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/cart', this.auth.isAuthenticated, (req, res) => this.cartController.createCart(req, res));
        this.router.post('/cart/:cartId/product', (req, res) => this.cartController.addProduct(req, res));
        this.router.delete('/cart/:cartId', (req, res) => this.cartController.deleteCart(req, res));
        this.router.delete('/cart/:cartId/product/:productName', (req, res) => this.cartController.deleteCartItem(req, res));
        this.router.get('/cart/:cartId', (req, res) => this.cartController.getCartById(req, res));
        this.router.get('/carts', (req, res) => this.cartController.getAllCarts(req, res));
    }
}
exports.default = new CartRouter().router;
