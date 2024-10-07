import { Request, Response } from 'express';
import CartService from '../service/cartservice';
import { createCartDTO } from '../service/cart_interface';
import {DecodedUser} from '../middleware/auth'


interface AuthRequest extends Request {
    user?: DecodedUser; 
}


class CartController {
    private cartService: CartService;

    constructor(cartService: CartService) {
        this.cartService = cartService;
    }

    async createCart(req: AuthRequest, res: Response): Promise<Response> {
        const userId = req.user?.id; 
        const cartData: createCartDTO = req.body;

        if (!userId) {
            return res.status(403).json({ message: 'User not authenticated' });
        }

        try {
            const cart = await this.cartService.createCart(cartData, userId);
            return res.status(201).json(cart);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating cart', error });
        }
    }

    async addProduct(req: Request, res: Response): Promise<Response> {
        const cartId = parseInt(req.params.cartId);
        const { name, price,} = req.body;

        try {
            const updatedCart = await this.cartService.addProduct(cartId, { name, price, });
    
            if (!updatedCart) {
                return res.status(404).json({
                    message: "Cart not found"
                });
            }
    
            return res.status(200).json(updatedCart);
        } catch (error) {
            console.error("Error adding product:", error);
            return res.status(500).json({
                message: "Error adding product",
                error
            });
        }
    }
    
    

    async deleteCart(req: Request, res: Response): Promise<Response> {
        const cartId = Number(req.params.cartId);

        try {
            const success = await this.cartService.deleteCart(cartId);
            if (!success) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            return res.status(204).send(); // No content to send back
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting cart', error });
        }
    }

    async deleteCartItem(req: Request, res: Response): Promise<Response> {
        const cartId = Number(req.params.cartId);
        const productName = req.params.productName;

        try {
            const updatedCart = await this.cartService.deleteCartItem(cartId, productName);
            if (!updatedCart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            return res.status(200).json(updatedCart);
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting cart item', error });
        }
    }

    async getCartById(req: Request, res: Response): Promise<Response> {
        const cartId = Number(req.params.cartId);

        try {
            const cart = await this.cartService.getCartById(cartId);
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching cart', error });
        }
    }

    async getAllCarts(req: Request, res: Response): Promise<Response> {
        try {
            const carts = await this.cartService.getAllCarts();
            return res.status(200).json(carts);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching carts', error });
        }
    }
}

export default CartController;

