/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplyingService } from './applying.service';

describe('ApplyingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplyingService]
    });
  });

  it('should ...', inject([ApplyingService], (service: ApplyingService) => {
    expect(service).toBeTruthy();
  }));
});
