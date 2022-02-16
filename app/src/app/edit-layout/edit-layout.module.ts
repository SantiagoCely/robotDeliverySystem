import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLayoutPageRoutingModule } from './edit-layout-routing.module';

import { EditLayoutPage } from './edit-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditLayoutPageRoutingModule
  ],
  declarations: [EditLayoutPage]
})
export class EditLayoutPageModule {}
