import { TestBed } from '@angular/core/testing';

import { TaskDetailsModalService } from './task-details-modal.service';

describe('TaskDetailsModalService', () => {
  let service: TaskDetailsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDetailsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
