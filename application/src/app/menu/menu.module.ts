import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuPage } from './menu.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SwiperModule } from 'swiper/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MenuPageRoutingModule,
    SwiperModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
