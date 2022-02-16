import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import { IonicModule } from '@ionic/angular';

import { BrowseMenuPageRoutingModule } from './browse-menu-routing.module';

import { BrowseMenuPage } from './browse-menu.page';

import { Component, OnInit } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //SIonicModule,
    BrowseMenuPageRoutingModule,
  ],
  declarations: [BrowseMenuPage],
})
export class BrowseMenuPageModule {}
