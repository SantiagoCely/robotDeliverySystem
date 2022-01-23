import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCurrentOrdersPage } from './view-current-orders.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCurrentOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCurrentOrdersPageRoutingModule {}
