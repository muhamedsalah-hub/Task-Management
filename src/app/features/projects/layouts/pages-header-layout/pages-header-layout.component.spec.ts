import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesHeaderLayoutComponent } from './pages-header-layout.component';

describe('PagesHeaderLayoutComponent', () => {
  let component: PagesHeaderLayoutComponent;
  let fixture: ComponentFixture<PagesHeaderLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesHeaderLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesHeaderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
