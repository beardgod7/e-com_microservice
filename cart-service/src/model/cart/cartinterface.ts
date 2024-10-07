export default interface CartAttributes {
  id: number;
  userId: number; 
  totalPrice: number;
  quantity: number;
  products: { productName: string; price: number }[]; 
  createdAt?: Date;
  updatedAt?: Date;
}
  
