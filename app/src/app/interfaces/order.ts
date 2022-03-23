import { MenuItem } from '../interfaces/menu-item';
//import { Observable } from 'rxjs';

export interface Order{
  id?: string;
  items?: string[]; //Array of item's id
  status?: boolean;
  table?: number;
  total?: number;
  totalPaid?: number;

}
/*
export class Order{
  items: MenuItem[];
  status: boolean;
  total: number;
  constructor (items, status, total){
    this.items = items;
    this.status = status;
    this.total = total;
  }

  addMenuItem(item){
    this.items.push(item);
    this.total += item.getPrice();
  }

  getTotal(){
    return this.total;
  }

  getItems(){
    return this.items;
  }
  getStatus(){
    return this.status;
  }

}
*/
