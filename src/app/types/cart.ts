export interface CartItem {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Cart {
  cartItem: [];
  totalAmount: number;
}
