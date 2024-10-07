import IProduct from '../model/product/productinterface';


export default interface IProductService {
  createProduct(data: createProductDTO): Promise<IProduct | null>;
  getAllProducts(): Promise<IProduct[]>;
  getProductById(id: number): Promise<IProduct | null>;
  updateProduct(id: number, data: ProductupdateDTO): Promise<IProduct | null>;
  deleteProduct(id: number): Promise<boolean>;
  reduceStock(productId: number, quantity: number): Promise<IProduct | null> 
}
  export interface ProductupdateDTO {
    name: string;
    description: string;
    price: number;
    category: string;
  }
  export interface createProductDTO {
    name: string;
    description: string;
    price: number;
    stocks: number;
    category: string;
  }
 