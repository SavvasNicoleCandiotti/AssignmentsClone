import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAssignmentDetailComponent } from './course-assignment-detail.component';

describe('CourseAssignmentDetailComponent', () => {
  let component: CourseAssignmentDetailComponent;
  let fixture: ComponentFixture<CourseAssignmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseAssignmentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseAssignmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
