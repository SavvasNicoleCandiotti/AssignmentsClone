import { TestBed } from '@angular/core/testing';

import { ProgramsServiceService } from './programs-service.service';

describe('ProgramsServiceService', () => {
  let service: ProgramsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
