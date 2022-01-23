import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLayoutPage } from './edit-layout.page';

const routes: Routes = [
  {
    path: '',
    component: EditLayoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLayoutPageRoutingModule {}
