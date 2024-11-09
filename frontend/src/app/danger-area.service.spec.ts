import { TestBed } from '@angular/core/testing';

import { DangerAreaService } from './danger-area.service';

describe('DangerAreaService', () => {
  let service: DangerAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DangerAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
