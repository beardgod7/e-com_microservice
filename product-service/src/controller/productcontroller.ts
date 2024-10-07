import { Request, Response, NextFunction } from 'express';
import IproductService from '../service/productservice-interface';
import { createProductDTO, ProductupdateDTO } from '../service/productservice-interface';
import ProductPublisher from '../utils/messagebroker';
import ErrorHandler from '../utils/Errorhandler';

class ProductController {
  private productService: IproductService;  

  constructor(productService: IproductService) {
    this.productService = productService;
  }

  public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: createProductDTO = req.body;
      const product = await this.productService.createProduct(data);
      if (product) {
        res.status(201).json({ message: 'Product created successfully', product });
        await ProductPublisher.sendProductInfo(product)
      } else {
        res.status(400).json({ message: 'Product creation failed' });
      }
    } catch (error) {
      console.error('Error creating product:', error);
      next(error);
    }
  }

  public reduceStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //consume from order
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return next(new ErrorHandler('Product ID and quantity are required.', 400));
      }

      const updatedProduct = await this.productService.reduceStock(productId, quantity);

      res.status(200).json({
        success: true,
        message: 'Stock reduced successfully.',
        product: updatedProduct,
      });
    } catch (error) {
      console.error('Error reducing stock:', error);
      next(error);
    }
  };

  public getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const products = await this.productService.getAllProducts();
      if (products.length > 0) {
        res.status(200).json({ products });
        await ProductPublisher.sendProductInfo(products)
      } else {
        res.status(404).json({ message: 'No products found' });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      next(error);
    }
  }

  public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const product = await this.productService.getProductById(id);
      if (product) {
        res.status(200).json({ product });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      next(error);
    }
  }

  public updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const data: ProductupdateDTO = req.body;
      const product = await this.productService.updateProduct(id, data);
      if (product) {
        res.status(200).json({ message: 'Product updated successfully', product });
      } else {
        res.status(400).json({ message: 'Product update failed' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      next(error);
    }
  }

  public deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.productService.deleteProduct(id);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      next(error);
    }
  }
}

export default ProductController;


