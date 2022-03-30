import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewMenuItemModalPage } from './create-new-menu-item-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewMenuItemModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateNewMenuItemModalPageRoutingModule {}
