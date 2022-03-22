import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../services/events.service';
import { CrudService } from '../services/crud.service';
//import { Subscription } from 'rxjs';
//import { Firestore, doc, onSnapshot, docSnapshots } from '@angular/fire/firestore';
import { CartService } from '../services/cart.service';
import { MenuItem } from '../interfaces/menu-item';
import { Order } from '../interfaces/order';
import { take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
//import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})

export class ViewOrderPage implements OnInit{
  order: Order;
  orderId : string;
  total_ordered_quantity: number;
  notSubmitted: MenuItem[] = []; // menu items not yet submitted, and thus not part of the Order yet
  total = 0;

  submitted: MenuItem[] = [];
  //message: string;
  //subscription: Subscription;
  constructor(
    //private afs: Firestore,
    private crudService: CrudService,
    //public events: EventsService,
    public cart: CartService


  //  private activatedRoute: ActivatedRoute,
  //  private router: Router
){ this.orderId = ""; }

  displayLocalCart(){
    console.log("items in cart");
    this.cart.subscribe('items', (id: any) => {
      console.log("item in cart, view-order: ", id);
      console.log("view-order cart 1", this.notSubmitted);
      this.crudService.getMenuById(id).subscribe( id => {
        this.notSubmitted.push(id);
        this.total += id.price;
        console.log("view-order cart 2", this.notSubmitted);
        console.log("view-order price ", this.total);
      })
    })
  }

  displayOrder(){
    this.cart.subscribe('total_ordered_quantity', (num_items: any) =>{
      if (num_items > 0){
        this.order.items.forEach((item) => {
          this.crudService.getMenuById(item).subscribe( item => {
            this.submitted.push(item);
          })
        })
      }
    })
    /*
    if (this.total_ordered_quantity > 0){
      this.order.items.forEach((item) => {
        this.crudService.getMenuById(item).subscribe( item => {
          this.submitted.push(item);
        })
      })
    }*/
  }

  ngOnInit() {
    console.log("View Order module");
    this.displayLocalCart();
    //this.displayOrder();
    //this.subscription = this.events.currentMessage.subscribe(message => this.message = message);
  }

  submitOrder(){
    //order cannot be empty
    if (this.notSubmitted.length > 0){
      this.order.table = 7.0;
      this.order.items = this.notSubmitted;
      this.order.status = false;
      this.order.total = this.total;
      this.order.totalPaid = 0;
      this.crudService.createOrder2(this.order).then((docRef) => {
        this.orderId = docRef.uid;
        console.log("Order created: ", this.orderId);
      })
      this.notSubmitted = []; //Clear cart after submitted
    } else {
      console.log('Order is empy');
    }
    /*
    this.notSubmitted.forEach((item) => {
      this.order.items.push(item.id);
    })

    this.order.total += this.cart.getTotal();
    this.total_ordered_quantity += this.cart.getCartTotalQuantity();
    this.cart.clearLocalCart();
*/
  }
  pay(){

  }


}
