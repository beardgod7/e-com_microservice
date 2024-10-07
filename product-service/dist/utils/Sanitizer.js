"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sanitizer {
    static sanitizeProductName(productName) {
        return productName.trim().toLowerCase();
    }
    static sanitizeDescription(description) {
        return description.trim();
    }
    static sanitizeCategory(category) {
        return category.trim();
    }
    static sanitizePrice(price) {
        const sanitizedPrice = parseFloat(price.toString());
        if (isNaN(sanitizedPrice) || sanitizedPrice < 0) {
            throw new Error('Invalid price. Price must be a positive number.');
        }
        return sanitizedPrice;
    }
    static sanitizeStock(stocks) {
        const sanitizedStocks = parseInt(stocks.toString(), 10);
        if (isNaN(sanitizedStocks) || sanitizedStocks < 0) {
            throw new Error('Invalid stock. Stock must be a non-negative integer.');
        }
        return sanitizedStocks;
    }
}
exports.default = Sanitizer;
