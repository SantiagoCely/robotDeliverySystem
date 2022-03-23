import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-current-orders',
  templateUrl: './view-current-orders.page.html',
  styleUrls: ['./view-current-orders.page.scss'],
})
export class ViewCurrentOrdersPage implements OnInit, OnChanges {
  orders: Order[] = [];
  displayUncompletedOrdersOnly: boolean;
  displayCompletedOrdersOnly: boolean;

  constructor(private adminService: AdminService) {
    this.displayCompletedOrdersOnly = false;
    this.displayUncompletedOrdersOnly = false; 
  }

  ngOnInit() { this.displayOrders(); }
  ngOnChanges(){
    console.log("View current orders refreshed. ");
    this.displayOrders();
  }

  displayOrders(){
    var temp = [];
    if (this.displayCompletedOrdersOnly && !this.displayUncompletedOrdersOnly){
      this.orders.forEach((order) => {
        if(order.status == true){
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
        if(order.status == false){
          console.log("order filtered: ", order.id);
          if (!temp.includes(order)){
            temp.push(order);
          }
        }
      })
      this.orders = temp;
    }
    else { // display all orders; happens on init
    this.adminService.getOrders().subscribe(res =>{
      this.orders = res;
    });
  }

    console.log("current orders: ", this.orders);
  }

}
