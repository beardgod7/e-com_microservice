import { Cart } from '../model/cart/cart'; 
import CartAttributes from '../model/cart/cartinterface';
import ICartService, {createCartDTO, productdto } from './cart_interface'; 

class CartService implements ICartService {
    private cartModel: typeof Cart;

    constructor(cartModel: typeof Cart) {
        this.cartModel = cartModel;
    }

    async createCart(data: createCartDTO, userId: number): Promise<Cart | null> {
        const products = data.products.map(product => ({
            productName: product.productName,
            price: product.price,
            quantity: 1, // Initialize quantity to 1 for each product
        }));

        const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0); // Calculate total quantity

        const cart = await this.cartModel.create({
            userId,
            totalPrice,
            products, 
            quantity: totalQuantity // Set the total quantity for the cart
        });

        return cart;
    }
    async addProduct(cartId: number, product: { name: string; price: number }): Promise<Cart | null> {
        const cart = await this.cartModel.findByPk(cartId);
        if (!cart) return null;
    
        // Ensure products array is initialized
        let products = cart.products ? [...cart.products] : [];
    
        // Flag to check if the product already exists
        let productExists = false;
    
        // Loop through products to find if the product is already in the cart
        products = products.map((p) => {
            if (p.productName === product.name) {
                // If product exists, update quantity and price
                productExists = true;
                return {
                    ...p,
                    quantity: p.quantity + 1, // Increase quantity by 1
                    price: (p.price / p.quantity) * (p.quantity + 1) // Update the total price proportionally
                };
            }
            return p; // Return other products unchanged
        });
    
        // If the product doesn't exist in the cart, add it
        if (!productExists) {
            products.push({
                productName: product.name,
                price: product.price, // New product's price
                quantity: 1 // New product starts with quantity 1
            });
        }
    
        // Update total price and total quantity in the cart
        cart.totalPrice += product.price;
        cart.quantity += 1;
    
        // Assign updated products array to cart
        cart.products = products;
    
        // Save the updated cart
        await cart.save();
    
        return cart;
    }
    
    async deleteCart(cartId: number): Promise<boolean> {
        const deletedCount = await this.cartModel.destroy({ where: { id: cartId } });
        return deletedCount > 0;
    }

    async deleteCartItem(cartId: number, productName: string): Promise<CartAttributes | null> {
        const cart = await this.cartModel.findByPk(cartId);
        if (!cart) return null;

        const productIndex = cart.products.findIndex((product: { productName: string; }) => product.productName === productName);
        if (productIndex > -1) {
            const productPrice = cart.products[productIndex].price;
            cart.products.splice(productIndex, 1); 
            cart.totalPrice -= productPrice;
            await cart.save();
        }

        return cart;
    }

    async getCartById(cartId: number): Promise<Cart | null> {
        return await this.cartModel.findByPk(cartId);
    }

    async getAllCarts(): Promise<Cart[]> {
        return await this.cartModel.findAll();
    }
}

export default CartService;
