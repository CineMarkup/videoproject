import { TestBed } from '@angular/core/testing';

import { AnnotationListService } from './annotation-list.service';

describe('AnnotationListService', () => {
  let service: AnnotationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnotationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
