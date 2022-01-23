import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAnalyticsPageRoutingModule } from './view-analytics-routing.module';

import { ViewAnalyticsPage } from './view-analytics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAnalyticsPageRoutingModule
  ],
  declarations: [ViewAnalyticsPage]
})
export class ViewAnalyticsPageModule {}
