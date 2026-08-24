import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { TasksService } from '../../../../../core/services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ITasks } from '../../../../../core/interfaces/Projects/types';
import {
  DatePipe,
  NgClass,
} from '../../../../../../../node_modules/@angular/common';
import { TrimTextPipe } from '../../../../../core/pipes/trim-text.pipe';
import {
  MatDatepicker,
  MatDatepickerInput,
} from '@angular/material/datepicker';

@Component({
  selector: 'app-task-details-pop-up',
  standalone: true,
  imports: [MatDatepicker, MatDatepickerInput],
  templateUrl: './task-details-pop-up.component.html',
  styleUrl: './task-details-pop-up.component.css',
})
export class TaskDetailsPopUpComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  private readonly _TasksService = inject(TasksService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  taskId = signal<string | null>('');
  task = signal<ITasks | null>(null);

  ngOnInit() {
    this.taskId.set(this._ActivatedRoute.snapshot.queryParamMap.get('taskId'));
    this._TasksService
      .getTask(this.taskId())
      .pipe(map((task) => task[0]))
      .subscribe((task) => {
        this.task.set(task);
      });
  }

  close() {
    this.closeModal.emit();
  }
}
