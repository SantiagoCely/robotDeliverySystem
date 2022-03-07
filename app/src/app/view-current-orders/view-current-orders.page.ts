import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-current-orders',
  templateUrl: './view-current-orders.page.html',
  styleUrls: ['./view-current-orders.page.scss'],
})
export class ViewCurrentOrdersPage implements OnInit {
  orders: Order[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() { }

  displayCurrentOrders(){

    this.adminService.getOrders().subscribe(res =>{
      this.orders = res;
    });
    console.log("current orders: ", this.orders);
  }

  


}
