import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsErrorComponent } from './projects-error.component';

describe('ProjectsErrorComponent', () => {
  let component: ProjectsErrorComponent;
  let fixture: ComponentFixture<ProjectsErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
