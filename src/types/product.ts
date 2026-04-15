export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}
