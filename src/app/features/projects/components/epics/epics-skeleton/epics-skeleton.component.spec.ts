import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicsSkeletonComponent } from './epics-skeleton.component';

describe('EpicsSkeletonComponent', () => {
  let component: EpicsSkeletonComponent;
  let fixture: ComponentFixture<EpicsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicsSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpicsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
