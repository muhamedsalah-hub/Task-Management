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
import { TaskDetailsPopUpComponent } from '../../../shared/task-details-pop-up/task-details-pop-up.component';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup
} from '@angular/cdk/drag-drop';
import { TasksService } from '../../../../../../core/services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { TaskDetailsModalService } from '../../../../../../core/services/task-details-modal.service';

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
  templateUrl: './board-view-tasks.component.html',
  styleUrl: './board-view-tasks.component.css',
})
export class BoardViewTasksComponent {
  @Input({ required: true }) groupedTasks!: Map<keyof IGroupedStatus, ITasks[]>;
  private readonly _TasksService = inject(TasksService);
  readonly _TaskDetailsModalService = inject(TaskDetailsModalService);
 private readonly _Toastr = inject(ToastrService);

  drop(event: CdkDragDrop<keyof IGroupedStatus>) {
    if (event.container.data === event.previousContainer.data) {
      return;
    }

    this._TasksService
      .updateTaskStatus(event.container.data, event.item.data.id)
      .subscribe({
        next: () => {
          this._TasksService.refreshTasks();
        },
        error:()=>{
           this._Toastr.error(`Failed to drag and drop task, try again later`);
        }
      });
  }
}
