import { Router } from 'express';
import CartController from '../controller/cartcontroller';
import CartService from '../service/cartservice';
import { Cart } from '../model/cart/cart';
import  Auth, { AuthRequest } from '../middleware/auth';

class CartRouter {
    public router: Router;
    private cartController: CartController;
    private auth: Auth;

    constructor() {
        this.router = Router();
        
        const cartService = new CartService(Cart);
        this.cartController = new CartController(cartService);
        this.auth = new Auth(); 
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/cart', this.auth.isAuthenticated, (req, res) => 
            this.cartController.createCart(req as AuthRequest, res)
        );
        this.router.post('/cart/:cartId/product', (req, res) => this.cartController.addProduct(req, res));
        this.router.delete('/cart/:cartId', (req,res)=>this.cartController.deleteCart(req,res));
        this.router.delete('/cart/:cartId/product/:productName', (req,res)=>this.cartController.deleteCartItem(req,res));
        this.router.get('/cart/:cartId', (req,res)=>this.cartController.getCartById(req,res)); 
        this.router.get('/carts', (req,res)=>this.cartController.getAllCarts(req,res));
    }
}

export default new CartRouter().router;


  