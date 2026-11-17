export type DishCategory = 'Appetizers' | 'Main Course' | 'Desserts' | 'Drinks';

export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  image: string;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  dish_id: string;
  name: string;
  price: number;
  quantity: number;
  special_instructions?: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  delivery_address: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  payment_method: 'cash' | 'online';
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}
