import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-empty-EpicTasks',
  standalone: true,
  imports: [],
  templateUrl: './empty-EpicTasks.component.html',
  styleUrl: './empty-EpicTasks.component.css',
})
export class EmptyTasksComponent {
  @Output() navigate = new EventEmitter<void>();

  goTo() {
    this.navigate.emit();
  }
}
