import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSkeletonComponent } from './members-skeleton.component';

describe('MembersSkeletonComponent', () => {
  let component: MembersSkeletonComponent;
  let fixture: ComponentFixture<MembersSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembersSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
