import { TestBed } from '@angular/core/testing';

import { HelptekstService } from './helptekst.service';

describe('HelptekstService', () => {
  let service: HelptekstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelptekstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
