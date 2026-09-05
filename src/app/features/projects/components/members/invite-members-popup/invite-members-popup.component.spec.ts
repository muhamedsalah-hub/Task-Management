import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteMembersPopupComponent } from './invite-members-popup.component';

describe('InviteMembersPopupComponent', () => {
  let component: InviteMembersPopupComponent;
  let fixture: ComponentFixture<InviteMembersPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteMembersPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InviteMembersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
