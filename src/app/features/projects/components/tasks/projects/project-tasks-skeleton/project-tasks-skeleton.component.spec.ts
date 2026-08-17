import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTasksSkeletonComponent } from './project-tasks-skeleton.component';

describe('ProjectTasksSkeletonComponent', () => {
  let component: ProjectTasksSkeletonComponent;
  let fixture: ComponentFixture<ProjectTasksSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTasksSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectTasksSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
