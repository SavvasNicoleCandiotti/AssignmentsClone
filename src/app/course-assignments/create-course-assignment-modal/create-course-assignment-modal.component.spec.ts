import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseAssignmentModalComponent } from './create-course-assignment-modal.component';

describe('CreateCourseAssignmentModalComponent', () => {
  let component: CreateCourseAssignmentModalComponent;
  let fixture: ComponentFixture<CreateCourseAssignmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCourseAssignmentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourseAssignmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
