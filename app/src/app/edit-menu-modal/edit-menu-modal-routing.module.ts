import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMenuModalPage } from './edit-menu-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditMenuModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMenuModalPageRoutingModule {}
