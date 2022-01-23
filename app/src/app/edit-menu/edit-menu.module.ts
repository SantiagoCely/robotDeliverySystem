import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMenuPageRoutingModule } from './edit-menu-routing.module';

import { EditMenuPage } from './edit-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMenuPageRoutingModule
  ],
  declarations: [EditMenuPage]
})
export class EditMenuPageModule {}
