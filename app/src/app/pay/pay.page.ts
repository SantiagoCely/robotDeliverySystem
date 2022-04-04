import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { CartService } from '../services/cart.service';
import { OrderToPay } from '../interfaces/orderToPay';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  error_msg : string;
  noTableSelected: boolean = true;
  amountToPayInput: number;
  leftToPay: number = 0;
  payOrder : OrderToPay = {
    items : [],
    orders: [],
    table : null,
    total : 0,
    totalPaid : 0,
  };

  constructor(
    private crudService: CrudService,
    public cart: CartService,
  ) { }

  ngOnInit() {
    this.resetSettings();
  }

  setTableNumber(inputValue: number) {
    this.payOrder.table = inputValue;
    this.noTableSelected = false;
    this.error_msg = '';
    document.getElementById("displayError").hidden = true;
    this.displayBill();
  }

  resetSettings() {
    this.noTableSelected = true;
    this.amountToPayInput = null;
    this.leftToPay = 0;
    this.payOrder = {
      items : [],
      orders: [],
      table : null,
      total : 0,
      totalPaid : 0,
    };
    this.error_msg = '';
    document.getElementById("displayError").hidden = true;
  }

  async displayBill() {
    await this.crudService.getOrdersAssignedToTable(this.payOrder.table).then((res) => {
      this.payOrder = {
        items : res.items,
        orders : res.orders,
        table : res.table,
        total : Math.round(res.total * 100) / 100,
        totalPaid : Math.round(res.totalPaid * 100) / 100,
      }
      this.leftToPay = this.payOrder.total - this.payOrder.totalPaid;
      this.leftToPay = Math.round(this.leftToPay * 100) / 100;
    })
  }

  payBill() {
    if (this.amountToPayInput == null || this.amountToPayInput < 0) {
      this.error_msg = 'The amount must be superior than 0';
      document.getElementById("displayError").hidden = false;
    } else if (this.amountToPayInput > this.leftToPay) {
      this.error_msg = 'Are you sure you want to leave a tip of ' + Math.round((this.amountToPayInput - this.leftToPay)*100)/100 + '$ ? ;)';
      document.getElementById("displayError").hidden = false;
    } else if (this.amountToPayInput && this.amountToPayInput <= this.leftToPay) {
      console.log('paying');
      this.error_msg = '';
      document.getElementById("displayError").hidden = true;

      this.crudService.payOrdersAssignedToTable(this.payOrder.orders, this.amountToPayInput).then((res) => {
        console.log("return from the payBill was", res);
      })
      this.payOrder.totalPaid += this.amountToPayInput;
        this.leftToPay = this.payOrder.total - this.payOrder.totalPaid;
        this.leftToPay = Math.round(this.leftToPay * 100) / 100;
        this.amountToPayInput = null;
        console.log('new left to pay is: ', this.leftToPay);
        console.log('new total paid is: ', this.payOrder.totalPaid);
    }
  }
}
