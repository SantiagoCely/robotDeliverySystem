import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
//import { AlertController } from '@ionic/angular';
import { CrudService } from '../services/crud.service';
//import { EventsService } from 'src/app/services/events.service';
//import { Observable, Subscription } from 'rxjs';
//import { map, filter } from 'rxjs/operators';
//import { Firestore } from '@angular/fire/firestore';
import { MenuItem } from '../interfaces/menu-item';
import { CartService } from '../services/cart.service';
import { IonicAuthService } from '../ionic-auth.service';


import { Router } from "@angular/router";
//import { ViewOrderPage } from '../view-order/view-order.page';
//import { increment } from 'firebase/firestore';

@Component({
  selector: 'app-browse-menu',
  templateUrl: './browse-menu.page.html',
  styleUrls: ['./browse-menu.page.scss'],

})

//@Output() menuToApp = new EventsService<String>();


export class BrowseMenuPage implements OnInit {

  //menuItems: MenuItem[];
  //types = ["Burgers", "Cold Drinks", "Chicken & Fish", "Sweets & Treats"];
  menuItems: MenuItem[] = [];
  filters: string [] = [];
  //message: string;
  //subscription: Subscription;
  constructor(
    private router: Router,
    private crudService: CrudService,
    private ionicAuthService: IonicAuthService,
    //private cd: ChangeDetectorRef,
    //private alertCtrl: AlertController,
    public cart: CartService
    //private events: EventsService
    //private router: Router,
    //public events: EventsService
  ){}


  addToOrder(item) {
    var id = item.toString();
    //console.log("trying to add item id from browse menu: ", id);
    this.cart.publish('items', id);
    //this.events.changeMessage(id);
  }

  filterItems(category){
    if (!this.filters.includes(category)){
      //console.log("filter added: ", category);
      this.filters.push(category);
      //console.log("filters: ", this.filters);
      this.displayMenuItems();
    }
  }

  displayMenuItems(){
    // if there are filters selected, filter menu items
    if (this.filters.length > 0){
      var temp = [];
      this.filters.forEach((filter) => {
        this.menuItems.forEach((item) => {
          if(item.category.includes(filter)){
            //console.log("item filtered: ", item.name);
            if (!temp.includes(item)){
              temp.push(item);
            }
          }
        })
        this.menuItems = temp;
      })

    } else { // no filters -- happens OnInit
      this.crudService.getMenuItems().subscribe(res => {
        this.menuItems = res;
        //this.cd.detectChanges();
      });
    }
    //console.log("menu items: ", this.menuItems);

  }


  clearFilters() {
    this.filters = [];
    this.displayMenuItems();
  }


  ngOnInit() {
    console.log("Browse Menu Page")
    this.displayMenuItems();
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
