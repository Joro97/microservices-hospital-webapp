import { TestBed } from '@angular/core/testing';

import { DoctorService } from './doctor.service';

describe('DoctorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorService = TestBed.get(DoctorService);
    expect(service).toBeTruthy();
  });
});
