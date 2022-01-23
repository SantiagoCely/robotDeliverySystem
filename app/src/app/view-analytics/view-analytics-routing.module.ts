import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAnalyticsPage } from './view-analytics.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAnalyticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAnalyticsPageRoutingModule {}
