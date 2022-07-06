import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAssignmentDetailComponent } from './program-assignment-detail.component';

describe('ProgramAssignmentDetailComponent', () => {
  let component: ProgramAssignmentDetailComponent;
  let fixture: ComponentFixture<ProgramAssignmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramAssignmentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramAssignmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
