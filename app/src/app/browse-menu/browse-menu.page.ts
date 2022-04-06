import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { MenuItem } from '../interfaces/menu-item';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-browse-menu',
  templateUrl: './browse-menu.page.html',
  styleUrls: ['./browse-menu.page.scss'],

})

export class BrowseMenuPage implements OnInit {
  menuItems: MenuItem[] = [];
  filters: string [] = [];
  constructor(
    private crudService: CrudService,
    public cart: CartService
  ){}

  addToOrder(item) {
    var id = item.toString();
    this.cart.publish('items', id);
  }

  filterItems(category){
    if (!this.filters.includes(category)){
      this.filters.push(category);
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
      });
    }
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