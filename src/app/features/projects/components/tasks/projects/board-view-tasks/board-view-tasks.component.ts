import { Component, inject, Input } from '@angular/core';
import { DatePipe, NgClass } from '../../../../../../../../node_modules/@angular/common';
import {
  IGroupedStatus,
  ITasks,
} from '../../../../../../core/interfaces/Projects/types';
import { TrimTextPipe } from '../../../../../../core/pipes/trim-text.pipe';
import { RouterLink } from "@angular/router";
import { TaskDetailsModalService } from '../../../shared/services/task-details-modal.service';
import { TaskDetailsPopUpComponent } from "../../../shared/task-details-pop-up/task-details-pop-up.component";

@Component({
  selector: 'app-board-view-tasks',
  standalone: true,
  imports: [NgClass, DatePipe, TrimTextPipe, RouterLink, TaskDetailsPopUpComponent],
  providers:[TaskDetailsModalService],
  templateUrl: './board-view-tasks.component.html',
  styleUrl: './board-view-tasks.component.css',
})
export class BoardViewTasksComponent {
  @Input({ required: true }) groupedTasks!: Map<keyof IGroupedStatus, ITasks[]>;
  readonly _TaskDetailsModalService=inject(TaskDetailsModalService)
}
