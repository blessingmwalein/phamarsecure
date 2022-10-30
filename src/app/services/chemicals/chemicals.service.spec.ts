/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChemicalsService } from './chemicals.service';

describe('Service: Chemicals', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChemicalsService]
    });
  });

  it('should ...', inject([ChemicalsService], (service: ChemicalsService) => {
    expect(service).toBeTruthy();
  }));
});
