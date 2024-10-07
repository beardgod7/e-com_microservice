import { Router } from 'express';
import ProductController from '../controller/productcontroller';
import ProductService from '../service/productservice';
import Product from '../model/product/product_pg'; 
import Auth from '../middleware/auth';
import IproductService from '../service/productservice-interface';

class ProductRouter {
   public router: Router;
   private productController: ProductController;
   private auth: Auth;
  
    constructor() {
      this.router = Router();
      const productService: IproductService = new ProductService(Product);
      this.productController = new ProductController(productService);
      this.auth = new Auth();
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      // Adjusted routes for product management
      this.router.post('/create-product',  this.productController.createProduct);
      this.router.get('/products', this.productController.getAllProducts);
      this.router.get('/product/:id', this.productController.getProductById);
      this.router.put('/product/:id',  this.productController.updateProduct);
      this.router.delete('/product/:id',  this.productController.deleteProduct);
    }
  }
  
export default new ProductRouter().router;


  
  