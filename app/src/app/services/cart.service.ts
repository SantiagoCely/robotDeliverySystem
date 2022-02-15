// used to implement a local cart service and store items added to cart before order is submitted
import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item';
import { CrudService } from '../services/crud.service';
import { take, filter } from 'rxjs/operators';
import { Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private channels: { [key: string]: Subject<any>; } = {};

     /**
      * Subscribe to a topic and provide a single handler/observer.
      * @param topic The name of the topic to subscribe to.
      * @param observer The observer or callback function to listen when changes are published.
      *
      * @returns Subscription from which you can unsubscribe to release memory resources and to prevent memory leak.
      */
     subscribe(topic: string, observer: (_: any) => void): Subscription {
         if (!this.channels[topic]) {
             // You can also use ReplaySubject with one concequence
             this.channels[topic] = new Subject<any>();
         }

         return this.channels[topic].subscribe(observer);
     }

     /**
      * Publish some data to the subscribers of the given topic.
      * @param topic The name of the topic to emit data to.
      * @param data data in any format to pass on.
      */
     publish(topic: string, data?: any): void {
         const subject = this.channels[topic];
         if (!subject) {
             // Or you can create a new subject for future subscribers
             return;
         }
         subject.next(data);
         console.log("service added: ", data);
     }

     /**
      * When you are sure that you are done with the topic and the subscribers no longer needs to listen to a particular topic, you can
      * destroy the observable of the topic using this method.
      * @param topic The name of the topic to destroy.
      */
     destroy(topic: string): null {
         const subject = this.channels[topic];
         if (!subject) {
             return;
         }

         subject.complete();
         delete this.channels[topic];
     }


/*
  /*items: MenuItem[] = [];
  //item: MenuItem;
  total_price: number = 0;
  total_cart_quantity: number = 0;
  notSubmitted: number = 0;

  constructor( private crudService: CrudService ) {}

  getTotalCartQuantity() : BehaviorSubject<number>{
    console.log("number of items: ", this.total_cart_quantity);
    return this.total_cart_quantity;
  }
  getCartTotalQuantity(){
    console.log("number of items: ", this.total_cart_quantity);
    return this.total_cart_quantity;
  }

  getCartItems() : BehaviorSubject<any>{
    console.log("items: ", this.items);
    return this.items;
  }
/*
  getCartItems(){
    console.log("items: ", this.items);
    return this.items;
  }

  getTotal() : BehaviorSubject<number> {
    console.log("total price: ", this.total_price);
    return this.total_price;
  }
  addToLocalCart(id){
    const currentCart = this.getCartItems().getValue();
    currentCart.push(id);
    this.items.next(currentCart);
    this.total_cart_quantity.next(this.total_cart_quantity.getValue() + 1);
    this.not_submitted.next(this.not_submitted.getValue() + 1);
    this.crudService.getMenuById(id).pipe(take(1)).subscribe( item => {
      this.total_price.next(this.total_price.getValue() + item.price);
      console.log("item price: ", item.price);
    })

    console.log(this.items.getValue());
  }

  removeItem(id){
    const currentCart = this.getCartItems().getValue();
    const items_kept = currentCart.filter(({keep_id}) => keep_id !== id);
    this.items.next(items_kept);

    this.total_cart_quantity.next(this.total_cart_quantity.getValue() - 1);
    this.not_submitted.next(this.not_submitted.getValue() - 1);
    this.crudService.getMenuById(id).pipe(take(1)).subscribe( item => {
      this.total_price.next(this.total_price.getValue() - item.price);
      console.log("item price: ", item.price);
    })

    console.log(this.items.getValue());
  }

/*
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


*/
}
