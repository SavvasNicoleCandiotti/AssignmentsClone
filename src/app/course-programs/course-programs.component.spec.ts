import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProgramsComponent } from './course-programs.component';

describe('CourseProgramsComponent', () => {
  let component: CourseProgramsComponent;
  let fixture: ComponentFixture<CourseProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
