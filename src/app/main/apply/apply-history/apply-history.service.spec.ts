/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplyHistoryService } from './apply-history.service';

describe('ApplyHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplyHistoryService]
    });
  });

  it('should ...', inject([ApplyHistoryService], (service: ApplyHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
