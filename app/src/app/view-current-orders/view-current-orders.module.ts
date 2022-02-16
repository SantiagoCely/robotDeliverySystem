import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCurrentOrdersPageRoutingModule } from './view-current-orders-routing.module';

import { ViewCurrentOrdersPage } from './view-current-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCurrentOrdersPageRoutingModule
  ],
  declarations: [ViewCurrentOrdersPage]
})
export class ViewCurrentOrdersPageModule {}
