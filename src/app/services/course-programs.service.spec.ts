import { TestBed } from '@angular/core/testing';

import { CourseProgramsService } from './course-programs.service';

describe('CourseProgramsService', () => {
  let service: CourseProgramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseProgramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
