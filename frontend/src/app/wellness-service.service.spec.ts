import { TestBed } from '@angular/core/testing';

import { WellnessServiceService } from './wellness-service.service';

describe('WellnessServiceService', () => {
  let service: WellnessServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WellnessServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
