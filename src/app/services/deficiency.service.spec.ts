import { TestBed } from '@angular/core/testing';

import { DeficiencyService } from './deficiency.service';

describe('DeficiencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeficiencyService = TestBed.get(DeficiencyService);
    expect(service).toBeTruthy();
  });
});
