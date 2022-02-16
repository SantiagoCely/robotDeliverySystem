import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMenuPageRoutingModule } from './edit-menu-routing.module';

import { EditMenuPage } from './edit-menu.page';

import { EditMenuModalPageModule } from '../edit-menu-modal/edit-menu-modal.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMenuPageRoutingModule,
    EditMenuModalPageModule
  ],
  declarations: [EditMenuPage]
})
export class EditMenuPageModule {}
