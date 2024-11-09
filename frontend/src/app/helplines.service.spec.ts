import { TestBed } from '@angular/core/testing';

import { HelplineService } from './helplines.service';

describe('HelplinesService', () => {
  let service: HelplineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelplineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
