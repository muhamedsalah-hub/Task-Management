import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewTasksComponent } from './list-view-tasks.component';

describe('ListViewTasksComponent', () => {
  let component: ListViewTasksComponent;
  let fixture: ComponentFixture<ListViewTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListViewTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
