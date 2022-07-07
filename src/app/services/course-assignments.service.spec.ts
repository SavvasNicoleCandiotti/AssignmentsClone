import { TestBed } from '@angular/core/testing';

import { CourseAssignmentsService } from './course-assignments.service';

describe('CourseAssignmentsService', () => {
  let service: CourseAssignmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseAssignmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
