import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerLoginPage } from './customer-login.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerLoginPageRoutingModule {}
