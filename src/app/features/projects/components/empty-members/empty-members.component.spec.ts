import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyMembersComponent } from './empty-members.component';

describe('EmptyMembersComponent', () => {
  let component: EmptyMembersComponent;
  let fixture: ComponentFixture<EmptyMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
