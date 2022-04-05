import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MenuItem } from '../interfaces/menu-item';

@Component({
  selector: 'app-edit-menu-modal',
  templateUrl: './edit-menu-modal.page.html',
  styleUrls: ['./edit-menu-modal.page.scss'],
})
export class EditMenuModalPage implements OnInit {
  id;
  item: MenuItem;

  constructor(private adminService: AdminService) { }

  ngOnInit() {

  }

  getMenuItem(){
    this.adminService.getMenuById(this.id).subscribe(res=>{
      this.item = res;
    })
  }

  onMenuItemNameChange(name){
    this.adminService.editMenuItemName(this.id, name);
    //console.log(`"Updated id and name:" ${this.id} ${name}`);
  }

  onMenuItemPrice(price){
    this.adminService.editMenuItemPrice(this.id, price);
    //console.log(`"Updated id and name:" ${this.id} ${price}`)
  }
  onMenuItemCategoryChange(){}
  onMenuItemTypeChange(){}




}
