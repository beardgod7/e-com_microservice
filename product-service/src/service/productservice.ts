import Product from '../model/product/product_pg';
import ErrorHandler from '../utils/Errorhandler';
import Iproduct from '../model/product/productinterface';
import IProductService, { createProductDTO, ProductupdateDTO } from './productservice-interface';
import ProductAttributes from '../model/product/productinterface';
import Sanitizer from '../utils/Sanitizer';


class ProductService implements IProductService {
  private productModel: typeof Product;

  constructor(productModel: typeof Product) {
    this.productModel = productModel;
  }

  
  async createProduct(data: createProductDTO): Promise<Iproduct | null> {
    const { name, price, description, stocks, category } = data;
    const sanitizedProductName = Sanitizer.sanitizeProductName(name);
    const sanitizedDescription = Sanitizer.sanitizeDescription(description);
    const sanitizedPrice = Sanitizer.sanitizePrice(price); 
    const sanitizedStocks = Sanitizer.sanitizeStock(stocks);
    const sanitizedCategory = Sanitizer.sanitizeCategory(category);

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
    
    await newProduct.save();
    return newProduct;
  }

  
  async reduceStock(productId: number, quantity: number): Promise<Product | null> {
    const product = await this.productModel.findByPk(productId);
    if (!product) {
      throw new ErrorHandler('Product not found.', 404);
    }

    if (product.stocks < quantity) {
      throw new ErrorHandler('Insufficient stock.', 400);
    }

    product.stocks -= quantity;
    await product.save();
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.findAll();
  }
  async getProductById(id: number): Promise<Product | null> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new ErrorHandler('Product not found.', 404);
    }
    return product;
  }

  async updateProduct(id: number, data: ProductupdateDTO): Promise<Product | null> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new ErrorHandler('Product not found.', 404);
    }

    const updatedData: Partial<ProductAttributes> = {};

    if (data.name) {
      updatedData.name = Sanitizer.sanitizeProductName(data.name);
    }
    if (data.description) {
      updatedData.description = Sanitizer.sanitizeDescription(data.description);
    }
    if (data.price) {
      updatedData.price = Sanitizer.sanitizePrice(data.price);
    }
    

    await product.update(updatedData);
    return product;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new ErrorHandler('Product not found.', 404);
    }
    await product.destroy();
    return true;
  }
}

export default ProductService;

