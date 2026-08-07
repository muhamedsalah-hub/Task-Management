import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-empty-tasks',
  standalone: true,
  imports: [],
  templateUrl: './empty-tasks.component.html',
  styleUrl: './empty-tasks.component.css',
})
export class EmptyTasksComponent {
  @Output() navigate = new EventEmitter<void>();

  goTo() {
    this.navigate.emit();
  }
}
