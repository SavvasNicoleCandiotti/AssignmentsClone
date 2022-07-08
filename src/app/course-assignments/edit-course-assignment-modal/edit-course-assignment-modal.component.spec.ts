import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseAssignmentModalComponent } from './edit-course-assignment-modal.component';

describe('EditCourseAssignmentModalComponent', () => {
  let component: EditCourseAssignmentModalComponent;
  let fixture: ComponentFixture<EditCourseAssignmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseAssignmentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourseAssignmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
