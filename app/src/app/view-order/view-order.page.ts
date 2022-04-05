import { Component, OnInit } from '@angular/core';
//import { EventsService } from '../services/events.service';
import { CrudService } from '../services/crud.service';
//import { Subscription } from 'rxjs';
//import { Firestore, doc, onSnapshot, docSnapshots } from '@angular/fire/firestore';
import { CartService } from '../services/cart.service';
import { MenuItem } from '../interfaces/menu-item';
import { Order } from '../interfaces/order';
import { Router } from "@angular/router";
import { OrderToPay } from '../interfaces/orderToPay';


//import { take } from 'rxjs/operators';
//import { Observable, BehaviorSubject } from 'rxjs';
//import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})

export class ViewOrderPage implements OnInit{
  order: Order = {
    items : [],
    ready : false,
    orderCompleted : false,
    table : null,
    total : 0,
    totalPaid : 0,
    timePlaced : 0,
  };
  error_msg : string;
  orderId : string;
  timeSubmitted : string;
  total : number = 0;
  total_ordered_quantity: number;
  itemsToDisplay: MenuItem[] = [];
  noTableSelected: boolean = true;

  submitted: MenuItem[] = [];
  //message: string;
  //subscription: Subscription;
  constructor(
    private crudService: CrudService,
    public cart: CartService,
    private router: Router,
){ }

  displayLocalCart(){
    console.log("items in cart");
    this.cart.subscribe('items', (id: any) => {
      this.crudService.getMenuById2(id).then( menuItem => {
        this.order.items.push(menuItem.id)
        this.itemsToDisplay.push(menuItem.data());
        this.total += menuItem.data().price;
        this.total = Math.round(this.total * 100) / 100;
        //console.log("view-order cart", this.itemsToDisplay);
        //console.log("view-order price ", this.total);
      })
    })
  }

  resetSettings() {
    this.order = {
      items : [],
      ready : false,
      orderCompleted : false,
      table : null,
      total : 0,
      totalPaid : 0,
      timePlaced : 0,
    };
    this.orderId = '';
    this.timeSubmitted = '';
    this.total = 0;
    this.itemsToDisplay = [];
    this.noTableSelected = true;

    this.error_msg = '';
    document.getElementById("displayError").hidden = true;
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
    this.router.navigateByUrl('browse-menu');
    /*
    if (!this.initViewOrderPage) {
      this.router.navigateByUrl('browse-menu');
      this.initViewOrderPage = true;
    }
    */
    //this.displayOrder();
    //this.subscription = this.events.currentMessage.subscribe(message => this.message = message);
  }

  ngAfterViewInit() {
    //this.router.navigateByUrl('browse-menu');
    /*
    if (!this.initViewOrderPage) {
      this.router.navigateByUrl('browse-menu');
      this.initViewOrderPage = true;
    }*/
  }

  submitOrder(){
    //order cannot be empty
    if (this.itemsToDisplay.length > 0 && this.order.table != null) {
      this.error_msg = '';
      document.getElementById("displayError").hidden = true;
      var tmp = new Date().getTime();
      this.order.timePlaced = tmp;
      this.order.total = this.total;
      this.timeSubmitted = (new Date(this.order.timePlaced)).toString();
      this.crudService.createOrder(this.order).then((docRef) => {
        console.log("Order created: ", docRef.id);
        this.orderId = docRef.id;
      })
      this.itemsToDisplay = []; //Clear the items in the not submitted cart var after submitting it
      // Reset attributes or order
      this.order.items = [];
      this.order.ready = false;
      this.order.orderCompleted = false;
      this.order.total = 0;
      this.order.table = null;
      this.order.totalPaid = 0;
      this.order.timePlaced = 0;
      this.total = 0;
    } else {

      if (this.itemsToDisplay.length == 0) {
        this.error_msg = 'There is nothing in the cart!';
        document.getElementById("displayError").hidden = false;
        console.log('Order is empty');
      } else if (this.order.table == null) {
        if(this.noTableSelected == true){

          this.error_msg = 'Please select a table before submitting an order!';
          document.getElementById("displayError").hidden = false;

        } else if(this.noTableSelected == false){

          this.error_msg = '';
          document.getElementById("displayError").hidden = true;

        }
      }
    }
  }
  pay(){
    this.router.navigateByUrl('pay');
  }

  setTableNumber(inputValue: number) {
    this.noTableSelected = false;
    this.order.table = inputValue;
    this.error_msg = '';
    document.getElementById("displayError").hidden = true;
  }
  slideOpts = {
    slidesPerView: 10,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

}
