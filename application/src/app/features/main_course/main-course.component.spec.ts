import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { Main_Course_Component } from './main-course.component';

describe('Main_Course_Component', () => {
  let component: Main_Course_Component;
  let fixture: ComponentFixture<Main_Course_Component>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [Main_Course_Component],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(Main_Course_Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
