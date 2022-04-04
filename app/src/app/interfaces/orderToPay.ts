import { MenuItem } from '../interfaces/menu-item';

export interface OrderToPay{
  items?: MenuItem[]; //Array of item's id
  orders?: string[]; // All orders associated to the table
  table?: number;
  total?: number;
  totalPaid?: number;
}