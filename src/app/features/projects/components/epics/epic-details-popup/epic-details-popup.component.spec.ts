import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicDetailsPopupComponent } from './epic-details-popup.component';

describe('EpicDetailsPopupComponent', () => {
  let component: EpicDetailsPopupComponent;
  let fixture: ComponentFixture<EpicDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicDetailsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpicDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
