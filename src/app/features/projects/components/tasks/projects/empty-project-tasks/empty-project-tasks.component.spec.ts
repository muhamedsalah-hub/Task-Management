import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyProjectTasksComponent } from './empty-project-tasks.component';

describe('EmptyProjectTasksComponent', () => {
  let component: EmptyProjectTasksComponent;
  let fixture: ComponentFixture<EmptyProjectTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyProjectTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyProjectTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
