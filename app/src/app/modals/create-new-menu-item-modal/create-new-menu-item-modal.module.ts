import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateNewMenuItemModalPageRoutingModule } from './create-new-menu-item-modal-routing.module';

import { CreateNewMenuItemModalPage } from './create-new-menu-item-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateNewMenuItemModalPageRoutingModule
  ],
  entryComponents: [CreateNewMenuItemModalPage],
  declarations: [CreateNewMenuItemModalPage]
})
export class CreateNewMenuItemModalPageModule {}
