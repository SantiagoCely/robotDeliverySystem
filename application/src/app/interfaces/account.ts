import { Order } from 'src/app/interfaces/order';
export interface Account {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  preferences: string[];
  pastOrders: Order[];
}
