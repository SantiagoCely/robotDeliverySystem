import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMenuPage } from './edit-menu.page';

const routes: Routes = [
  {
    path: '',
    component: EditMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMenuPageRoutingModule {}
