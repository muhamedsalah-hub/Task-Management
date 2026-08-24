import { Component, inject, Input } from '@angular/core';
import {
  DatePipe,
  NgClass,
} from '../../../../../../../../node_modules/@angular/common';
import {
  IGroupedStatus,
  ITasks,
} from '../../../../../../core/interfaces/Projects/types';
import { TrimTextPipe } from '../../../../../../core/pipes/trim-text.pipe';
import { RouterLink } from '@angular/router';
import { TaskDetailsModalService } from '../../../shared/services/task-details-modal.service';
import { TaskDetailsPopUpComponent } from '../../../shared/task-details-pop-up/task-details-pop-up.component';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TasksService } from '../../../../../../core/services/tasks.service';

@Component({
  selector: 'app-board-view-tasks',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    TrimTextPipe,
    RouterLink,
    TaskDetailsPopUpComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  providers: [TaskDetailsModalService],
  templateUrl: './board-view-tasks.component.html',
  styleUrl: './board-view-tasks.component.css',
})
export class BoardViewTasksComponent {
  @Input({ required: true }) groupedTasks!: Map<keyof IGroupedStatus, ITasks[]>;
  private readonly _TasksService = inject(TasksService);
  readonly _TaskDetailsModalService = inject(TaskDetailsModalService);

  drop(event: CdkDragDrop<keyof IGroupedStatus>) {
    this._TasksService
      .updateTaskStatus(event.container.data, event.item.data.id)
      .subscribe(() => {
        this._TasksService.refreshTasks();
      });
  }
}
