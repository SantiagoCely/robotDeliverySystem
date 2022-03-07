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
  async openEditMenuItem(id){
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


  ngOnInit() {
    console.log("Edit Menu Page")
    this.displayMenuItems();
  }

}
