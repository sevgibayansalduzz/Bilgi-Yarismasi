/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuizGuardService } from './QuizGuard.service';

describe('Service: QuizGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizGuardService]
    });
  });

  it('should ...', inject([QuizGuardService], (service: QuizGuardService) => {
    expect(service).toBeTruthy();
  }));
});
