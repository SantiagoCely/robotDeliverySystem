import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CustomerLoginPageRoutingModule } from './customer-login-routing.module';

import { CustomerLoginPage } from './customer-login.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerLoginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CustomerLoginPage]
})
export class CustomerLoginPageModule {}
