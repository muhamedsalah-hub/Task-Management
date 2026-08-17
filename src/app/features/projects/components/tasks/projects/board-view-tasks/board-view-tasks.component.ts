import { Component, Input } from '@angular/core';
import { DatePipe, NgClass } from '../../../../../../../../node_modules/@angular/common';
import {
  IGroupedStatus,
  ITasks,
} from '../../../../../../core/interfaces/Projects/types';
import { TrimTextPipe } from '../../../../../../core/pipes/trim-text.pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-board-view-tasks',
  standalone: true,
  imports: [NgClass, DatePipe, TrimTextPipe, RouterLink],
  templateUrl: './board-view-tasks.component.html',
  styleUrl: './board-view-tasks.component.css',
})
export class BoardViewTasksComponent {
  @Input({ required: true }) groupedTasks!: Map<keyof IGroupedStatus, ITasks[]>;
}
