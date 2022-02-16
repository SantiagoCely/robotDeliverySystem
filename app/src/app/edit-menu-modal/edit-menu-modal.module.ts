import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMenuModalPageRoutingModule } from './edit-menu-modal-routing.module';

import { EditMenuModalPage } from './edit-menu-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMenuModalPageRoutingModule
  ],
  declarations: [EditMenuModalPage]
})
export class EditMenuModalPageModule {}
