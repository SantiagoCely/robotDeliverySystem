import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from '../services/admin.service';
import { MenuItem } from '../interfaces/menu-item';
import { Router } from "@angular/router";
//import { EditMenuModalPage } from '../edit-menu-modal/edit-menu-modal.page';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.page.html',
  styleUrls: ['./edit-menu.page.scss'],
})
export class EditMenuPage implements OnInit {
  menuItems: MenuItem[] = [];
  filters: string [] = [];
  dataFromModal: any;
  constructor(
    private adminService: AdminService,
    private router: Router,
    //public modalController: ModalController
  ) {}

  displayMenuItems(){
    // if there are filters selected, filter menu items
    if (this.filters.length > 0){
      var temp = [];
      this.filters.forEach((filter) => {
        this.menuItems.forEach((item) => {
          if(item.category.includes(filter)){
            console.log("item filtered: ", item.name);
            if (!temp.includes(item)){
              temp.push(item);
            }
          }
        })
        this.menuItems = temp;
      })

    } else { // no filters -- happens OnInit
      this.adminService.getMenuItems().subscribe(res => {
        this.menuItems = res;
        //this.cd.detectChanges();
      });
    }
    console.log("menu items: ", this.menuItems);

  }

  onMenuItemNameChange(id, name){
    this.adminService.editMenuItemName(id, name);
    console.log(`"Updated id and name:" ${id} ${name}`);
  }

  onMenuItemPrice(id, price){
    this.adminService.editMenuItemPrice(id, price);
    console.log(`"Updated id and price:" ${id} ${price}`)
  }
  onMenuItemCategoryChange(id, category){
    this.adminService.editMenuItemCategory(id, category);
    console.log(`"Updated id and category:" ${id} ${category}`);
  }
  onMenuItemTypeChange(id, type){
    this.adminService.editMenuItemType(id, type);
    console.log(`"Updated id and type:" ${id} ${type}`);
  }

  onAddMenuItem(item){
    var newId = this.adminService.createMenuItem(item);
    if (newId != null){
      console.log(`"new menu item created:" ${newId}`);
    }
  }

  onDeleteMenuItem(id){
    this.adminService.removeMenuItem(id);

  }

  ngOnInit() {
    console.log("Edit Menu Page")
    this.displayMenuItems();
  }

}
