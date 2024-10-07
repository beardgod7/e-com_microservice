"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductController {
    constructor(productService) {
        this.createProduct = async (req, res, next) => {
            try {
                const data = req.body;
                const product = await this.productService.createProduct(data);
                if (product) {
                    res.status(201).json({ message: 'Product created successfully', product });
                }
                else {
                    res.status(400).json({ message: 'Product creation failed' });
                }
            }
            catch (error) {
                console.error('Error creating product:', error);
                next(error);
            }
        };
        this.getAllProducts = async (req, res, next) => {
            try {
                const products = await this.productService.getAllProducts();
                if (products.length > 0) {
                    res.status(200).json({ products });
                }
                else {
                    res.status(404).json({ message: 'No products found' });
                }
            }
            catch (error) {
                console.error('Error fetching products:', error);
                next(error);
            }
        };
        this.getProductById = async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                const product = await this.productService.getProductById(id);
                if (product) {
                    res.status(200).json({ product });
                }
                else {
                    res.status(404).json({ message: 'Product not found' });
                }
            }
            catch (error) {
                console.error('Error fetching product:', error);
                next(error);
            }
        };
        this.updateProduct = async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                const data = req.body;
                const product = await this.productService.updateProduct(id, data);
                if (product) {
                    res.status(200).json({ message: 'Product updated successfully', product });
                }
                else {
                    res.status(400).json({ message: 'Product update failed' });
                }
            }
            catch (error) {
                console.error('Error updating product:', error);
                next(error);
            }
        };
        this.deleteProduct = async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                await this.productService.deleteProduct(id);
                res.status(200).json({ message: 'Product deleted successfully' });
            }
            catch (error) {
                console.error('Error deleting product:', error);
                next(error);
            }
        };
        this.productService = productService;
    }
}
exports.default = ProductController;
