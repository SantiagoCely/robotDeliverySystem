import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Order } from '../interfaces/order';
import { MenuItem } from '../interfaces/menu-item';
import { AdminService } from '../services/admin.service';
import { IonicAuthService } from '../ionic-auth.service';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";
import { CrudService } from '../services/crud.service';


@Component({
  selector: 'app-view-current-orders',
  templateUrl: './view-current-orders.page.html',
  styleUrls: ['./view-current-orders.page.scss'],
})
export class ViewCurrentOrdersPage implements OnInit, OnChanges {
  orders: Order[] = [];
  displayUncompletedOrdersOnly: boolean;
  displayCompletedOrdersOnly: boolean;
  orderSubscription: Subscription;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private crudService: CrudService,

    ) {
    this.displayCompletedOrdersOnly = false;
    this.displayUncompletedOrdersOnly = false;
  }

  ngOnInit() {
    this.displayOrders();
    if (!this.ionicAuthService.isAdminLoggedIn()){
      console.log('Current user does not have admin priviledges')
      this.router.navigateByUrl('browse-menu');
    }
  }

  ngOnDestroy() {
    // Unsubscribe from elements that are not needed outside of this scope
    this.orderSubscription.unsubscribe();
  }

  ngOnChanges(){
    console.log("View current orders refreshed. ");
    this.displayOrders();
  }

  displayOrders(){
    var temp = [];
    if (this.displayCompletedOrdersOnly && !this.displayUncompletedOrdersOnly){
      this.orders.forEach((order) => {
        if(order.ready == true){
          console.log("order filtered: ", order.id);
          if (!temp.includes(order)){
            temp.push(order);
          }
        }
      })
      this.orders = temp;
    }
    else if (!this.displayCompletedOrdersOnly && this.displayUncompletedOrdersOnly){
      this.orders.forEach((order) => {
        if(order.ready == false){
          console.log("order filtered: ", order.id);
          if (!temp.includes(order)){
            temp.push(order);
          }
        }
      })
      this.orders = temp;
    }
    else { // display all orders; happens on init

    this.orderSubscription = this.adminService.getOrders().subscribe(res =>{
      console.log(res);
      this.orders = res;
    });
    console.log("admin service getting all orders");
  }
    console.log("current orders: ", this.orders);
  }

  getMenuItemById(id){
    return this.adminService.getMenuById(id).subscribe( res => {
      console.log(res);
    })
  }

  orderReady(orderId: string, status: boolean) {
    this.crudService.updateOrderStatus(orderId, !status);
  }

  goHome() {
    if (this.ionicAuthService.isAdminLoggedIn()) {
      this.router.navigateByUrl('admin');
    } else {
      console.log('Current user does not have admin priviledges')
      this.router.navigateByUrl('browse-menu');
    }
  }

}
