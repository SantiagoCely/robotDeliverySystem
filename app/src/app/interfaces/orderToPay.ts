import { MenuItem } from '../interfaces/menu-item';

export interface OrderToPay{
  items?: MenuItem[]; //Array of item's id
  table?: number;
  total?: number;
  totalPaid?: number;
}