import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsPopUpComponent } from './task-details-pop-up.component';

describe('TaskDetailsPopUpComponent', () => {
  let component: TaskDetailsPopUpComponent;
  let fixture: ComponentFixture<TaskDetailsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailsPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
