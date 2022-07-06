import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAssignmentComponent } from './program-assignment.component';

describe('ProgramAssignmentComponent', () => {
  let component: ProgramAssignmentComponent;
  let fixture: ComponentFixture<ProgramAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
