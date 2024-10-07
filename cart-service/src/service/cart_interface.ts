import  CartAttributes  from '../model/cart/cartinterface'; 

export default interface ICartService {
  createCart(data: createCartDTO, userId: number): Promise<CartAttributes | null>;
  addProduct(cartId: number, product: { name: string; price: number }): Promise<CartAttributes | null>;
  deleteCart(cartId: number): Promise<boolean>;
  deleteCartItem(cartId: number, productName: string): Promise<CartAttributes | null>;
  getCartById(cartId: number): Promise<CartAttributes | null>;
  getAllCarts(): Promise<CartAttributes[]>;
}
export interface productdto{
  name: string; 
  price: number
  quantity:number
}
export interface createCartDTO {
  products: { productName: string; price: number  }[]; 
}
