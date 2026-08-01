import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsSkeletonComponent } from './projects-skeleton.component';

describe('ProjectsSkeletonComponent', () => {
  let component: ProjectsSkeletonComponent;
  let fixture: ComponentFixture<ProjectsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
