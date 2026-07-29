import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyEpicsComponent } from './empty-epics.component';

describe('EmptyEpicsComponent', () => {
  let component: EmptyEpicsComponent;
  let fixture: ComponentFixture<EmptyEpicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyEpicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyEpicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
