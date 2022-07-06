import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAssignmentsComponent } from './program-assignments.component';

describe('ProgramAssignmentsComponent', () => {
  let component: ProgramAssignmentsComponent;
  let fixture: ComponentFixture<ProgramAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
