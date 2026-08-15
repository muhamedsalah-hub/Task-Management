import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardViewTasksComponent } from './board-view-tasks.component';

describe('BoardViewTasksComponent', () => {
  let component: BoardViewTasksComponent;
  let fixture: ComponentFixture<BoardViewTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardViewTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardViewTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
