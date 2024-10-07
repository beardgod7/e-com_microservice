
  import { Router } from 'express';
  import OrderController from '../controller/ordercontroller'; 
  
  class OrderRoute {
    public router: Router;
  
    constructor() {
      this.router = Router();
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.post('/orders', OrderController.createOrder);
    }
  }
  
  export default new OrderRoute().router;
  