import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AppetizersRoutingModule } from './appetizers-routing.module';
import { AppetizersComponent } from './appetizers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, TranslateModule, AppetizersRoutingModule, NgbModule],
  declarations: [AppetizersComponent],
})
export class AppetizersModule {}
