import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { DessertRoutingModule } from './dessert-routing.module';
import { DessertComponent } from './dessert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, TranslateModule, DessertRoutingModule, NgbModule],
  declarations: [DessertComponent],
})
export class DesertModule {}
