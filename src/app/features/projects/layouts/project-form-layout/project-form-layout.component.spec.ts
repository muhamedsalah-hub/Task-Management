import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormLayoutComponent } from './project-form-layout.component';

describe('ProjectFormLayoutComponent', () => {
  let component: ProjectFormLayoutComponent;
  let fixture: ComponentFixture<ProjectFormLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFormLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectFormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
