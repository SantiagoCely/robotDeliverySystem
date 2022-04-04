import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { CartService } from '../services/cart.service';
import { MenuItem } from '../interfaces/menu-item';
import { Router } from "@angular/router";
import { OrderToPay } from '../interfaces/orderToPay';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  error_msg : string;
  noTableSelected: boolean = true;
  payOrder : OrderToPay = {
    items : [],
    table : null,
    total : 0,
    totalPaid : 0,
  };

  constructor(
    private crudService: CrudService,
    public cart: CartService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  setTableNumber(inputValue: number) {
    this.payOrder.table = inputValue;
    this.error_msg = '';
    document.getElementById("displayError").hidden = true;
  }

  async displayBill() {
    if (this.payOrder.table == null){
      if(this.noTableSelected == true){
        this.error_msg = 'Please select a table before paying!';
        document.getElementById("displayError").hidden = false;

      }else if(this.noTableSelected == false){
        this.error_msg = '';
        document.getElementById("displayError").hidden = true;

      }
    } else {
      await this.crudService.getOrdersAssignedToTable(this.payOrder.table).then((res) => {
        this.payOrder = {
          items : res.items,
          orders : res.orders,
          table : res.table,
          total : res.total,
          totalPaid : res.totalPaid,
        }
        console.log(this.payOrder);
      })
    }
  }
}
