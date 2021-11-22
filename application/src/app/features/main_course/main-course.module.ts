import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { Main_Course_RoutingModule } from './ main-course-routing.module';
import { Main_Course_Component } from './main-course.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    Main_Course_RoutingModule,
    NgbModule,
  ],
  declarations: [Main_Course_Component],
})
export class Main_CourseModule {}
