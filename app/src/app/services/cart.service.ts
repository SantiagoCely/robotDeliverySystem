// used to implement a local cart service and store items added to cart before order is submitted
import { Injectable } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { CrudService } from 'src/app/services/crud.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: MenuItem[] = [];
  //item: MenuItem;
  total_price: number = 0;
  total_cart_quantity: number = 0;
  notSubmitted: number = 0;

  constructor( private crudService: CrudService ) {}

  getCartTotalQuantity(){
    console.log("number of items: ", this.total_cart_quantity);
    return this.total_cart_quantity;
  }

  getCartItems(){
    console.log("items: ", this.items);
    return this.items;
  }

  getTotal(){
    return this.total_price;
  }

  removeItem(id){
    var index = this.items.indexOf(id);
    this.items.splice(index);
    --this.total_cart_quantity;
    --this.notSubmitted;
    this.crudService.getMenuById(id).pipe(take(1)).subscribe( item => {
      this.total_price -= item.price;
      console.log("item price: ", item.price);
    })
    console.log("added " ,id, " removed from order ", "total price: ", this.total_price);
  }

  addToLocalCart(id){
    this.items.push(id);
    ++this.total_cart_quantity;
    ++this.notSubmitted;
    this.crudService.getMenuById(id).pipe(take(1)).subscribe( item => {
      this.total_price += item.price;
      console.log("item price: ", item.price);
    })
    console.log("added " ,id, " to order, not yet submitted", "total price: ", this.total_price);
  }

  clearLocalCart(){
    this.items = [];
    this.total_cart_quantity = 0;
    this.total_price = 0;
  }

}
