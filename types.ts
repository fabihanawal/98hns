
export interface MenuItemOption {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number | string;
  options?: MenuItemOption[];
  category: string;
  image?: string;
  isSpicy?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedOptionLabel?: string;
  finalPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  items: CartItem[];
  total: number;
  timing: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: number;
}

export type CategoryType = string;
