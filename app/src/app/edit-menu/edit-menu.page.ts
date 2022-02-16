import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from '../services/admin.service';
import { MenuItem } from '../interfaces/menu-item';
import { Router } from "@angular/router";
import { EditMenuModalPage } from '../edit-menu-modal/edit-menu-modal.page';
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
    public modalController: ModalController

  ) {}
  openEditMenuItem(id){
    // create modal
    // FIGURE OUT HOW TO CREATE AND EDIT MODALS
    const modal = this.modalController.create({
      component: EditMenuModalPage,
      componentProps: {id: id}
    });
    //modal.present();

  }
  closeEditMenuItem(id){
    // close modal

  }

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

  editMenuItemName(id, name){
    this.adminService.editMenuItemName(id, name);
    this.adminService.getMenuById(id).subscribe(item => {
      console.log("new name: " + item.name); // should be updated;
    })
  }
  editMenuItemPrice(id, price){
    this.adminService.editMenuItemPrice(id, price);
    this.adminService.getMenuById(id).subscribe(item => {
      console.log("new price: " + item.name + " " + item.price); // should be updated;
    })
  }
  addMenuItemCategory(id, category){
    this.adminService.addMenuItemCategory(id, category);
    this.adminService.getMenuById(id).subscribe(item => {
      console.log("new category: " + item.name + " " + item.category); // should be updated;
    })
  }
  removeMenuItemCategory(id, category){
    this.adminService.removeMenuItemCategory(id, category);
    this.adminService.getMenuById(id).subscribe(item => {
      console.log("new category: " + item.name + " " + item.category); // should be updated;
    })
  }
  removeMenuItem(id, name){
    // can add other user control statements here
    console.log(name + " will be deleted");
    this.adminService.removeMenuItem(id);
  }

  ngOnInit() {
    console.log("Edit Menu Page")
    this.displayMenuItems();
  }

}
