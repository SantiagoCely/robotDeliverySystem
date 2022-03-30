import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from "@angular/router";
import { EditMenuPageRoutingModule } from './edit-menu-routing.module';

import { EditMenuPage } from './edit-menu.page';


//import { EditMenuModalPageModule } from '../edit-menu-modal/edit-menu-modal.module';
import { CreateNewMenuItemModalPageModule } from '../modals/create-new-menu-item-modal/create-new-menu-item-modal.module';
//import { MyModalPageModule } from '../modals/my-modal/my-modal.module';
//import { MyModalPage } from '../modals/my-modal/my-modal.page';

@NgModule({
  //entryComponents: [CreateNewMenuItemModalPageModule],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMenuPageRoutingModule,

    CreateNewMenuItemModalPageModule,
    RouterModule
    //MyModalPageModule
    //EditMenuModalPageModule
  ],
  declarations: [EditMenuPage/*, CreateNewMenuItemModalPageModule*/],
//  entryComponents: [CreateNewMenuItemModalPageModule]
})
export class EditMenuPageModule {}
