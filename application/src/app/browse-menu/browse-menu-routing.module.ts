import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowseMenuPage } from './browse-menu.page';

const routes: Routes = [
  {
    path: '',
    component: BrowseMenuPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseMenuPageRoutingModule {}
