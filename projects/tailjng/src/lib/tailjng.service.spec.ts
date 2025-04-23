import { TestBed } from '@angular/core/testing';

import { TailjngService } from './tailjng.service';

describe('TailjngService', () => {
  let service: TailjngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TailjngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
