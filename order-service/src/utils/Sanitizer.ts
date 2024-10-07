export default class Sanitizer {
  static sanitizeProductName(productName: string): string {
    return productName.trim().toLowerCase();
  }

  static sanitizeDescription(description: string): string {
    return description.trim();
  }

  static sanitizeCategory(category: string): string {
    return category.trim();
  }

  static sanitizePrice(price: number): number {
    const sanitizedPrice = parseFloat(price.toString()); 
    if (isNaN(sanitizedPrice) || sanitizedPrice < 0) {
      throw new Error('Invalid price. Price must be a positive number.');
    }
    return sanitizedPrice;
  }

  static sanitizeStock(stocks: number): number {
    const sanitizedStocks = parseInt(stocks.toString(), 10); 
    if (isNaN(sanitizedStocks) || sanitizedStocks < 0) {
      throw new Error('Invalid stock. Stock must be a non-negative integer.');
    }
    return sanitizedStocks;
  }
}

  