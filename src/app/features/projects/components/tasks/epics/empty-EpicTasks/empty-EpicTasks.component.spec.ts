import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTasksComponent } from './empty-EpicTasks.component';

describe('EmptyTasksComponent', () => {
  let component: EmptyTasksComponent;
  let fixture: ComponentFixture<EmptyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
