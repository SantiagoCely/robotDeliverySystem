import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from '../services/admin.service';
import { MenuItem } from '../interfaces/menu-item';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { Subscription } from 'rxjs';

import { CreateNewMenuItemModalPage } from '../modals/create-new-menu-item-modal/create-new-menu-item-modal.page';

//import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

//import { EditMenuModalPage } from '../edit-menu-modal/edit-menu-modal.page';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.page.html',
  styleUrls: ['./edit-menu.page.scss'],
})
export class EditMenuPage implements OnInit, OnChanges, OnDestroy {
  menuItems: MenuItem[] = [];
  filters: string [] = [];
  menuItemsSubscription: Subscription;
  dataReturned: any;
  /*newItemForm = this.formBuilder.group({
    name: '',
    price: 0,
    category: '',
    type: '',
    image: ''
  });*/

  //dataFromModal: any
  constructor(
    private adminService: AdminService,
    private router: Router,
    private ionicAuthService: IonicAuthService,
    //private formBuilder: FormBuilder
    public modalController: ModalController,
  ) {

  }

  async openCreateNewMenuItemModal() {
  //  this.router.navigateByUrl('create-new-menu-item');
    const modal = await this.modalController.create({
      component: CreateNewMenuItemModalPage,

      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });
    console.log("Modal created");

    modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //console.log(this.dataReturned);
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
    //await modal.present();
   return await modal.present();

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
      this.menuItemsSubscription = this.adminService.getMenuItems().subscribe(res => {
        this.menuItems = res;
        //this.cd.detectChanges();
      });
    }
    //console.log("menu items: ", this.menuItems);

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

  onAddMenuItem(newItemFormData) {
    console.log("New item data: " , newItemFormData);
    //console.log(typeof newItemFormData.newItemName, typeof newItemFormData.newItemPrice,
    //newItemFormData.newItemCategory, newItemFormData.newItemType);
    const newItem : MenuItem = {
      name : '',
      price: 0,
      category : [],
      type : '',
      image : ''
    }
    newItem.name = newItemFormData.newItemName;
    newItem.price = newItemFormData.newItemPrice;
    newItem.category = newItemFormData.newItemCategory.split(',');
    newItem.type = newItemFormData.newItemType;
    newItem.image = "add image path here";

    //console.log(newItem);
    this.adminService.createMenuItem(newItem);

  }

  goHome() {
    if (this.ionicAuthService.isAdminLoggedIn()) {
      this.router.navigateByUrl('admin');
    } else {
      console.log('Current user does not have admin priviledges')
      this.router.navigateByUrl('browse-menu');
    }
  }

  onDeleteMenuItem(id){
    console.log("Id to delete: ", id);
    this.adminService.removeMenuItem(id);
    console.log(`"Deleted id: " ${id}`);

  }

  ngOnInit() {
    console.log("Edit Menu Page");
    this.displayMenuItems();
    if (!this.ionicAuthService.isAdminLoggedIn()){
      console.log('Current user does not have admin priviledges')
      this.router.navigateByUrl('browse-menu');
    }
  }

  ngOnDestroy() {
    // Unsubscribe from elements that are not needed outside of this scope
    this.menuItemsSubscription.unsubscribe();
  }

  ngOnChanges(){
    console.log("Edit Menu Page Refreshed");
    this.displayMenuItems();
  }

}
