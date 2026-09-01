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
import {
  IStatus,
  ITasks,
  IUpdateTaskForm,
} from '../../../../../core/interfaces/Projects/types';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
} from '../../../../../../../node_modules/@angular/common';
import { TrimTextPipe } from '../../../../../core/pipes/trim-text.pipe';
import {
  MatDatepicker,
  MatDatepickerInput,
} from '@angular/material/datepicker';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { statusValues } from '../../../../../core/data/data';
import { EpicService } from '../../../../../core/services/epic.service';
import { MembersService } from '../../../../../core/services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-details-pop-up',
  standalone: true,
  imports: [
    MatDatepicker,
    MatDatepickerInput,
    ReactiveFormsModule,
    NgClass,
    AsyncPipe,
    TrimTextPipe,
    DatePipe,
  ],
  templateUrl: './task-details-pop-up.component.html',
  styleUrl: './task-details-pop-up.component.css',
})
export class TaskDetailsPopUpComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  private readonly _TasksService = inject(TasksService);
  private readonly _Toastr = inject(ToastrService);
  private readonly _EpicService = inject(EpicService);
  private readonly _MembersService = inject(MembersService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FormBuilder = inject(FormBuilder);
  taskId = signal<string | null>('');
  task = signal<ITasks | null>(null);
  statusValues = statusValues;
  epics$ = this._EpicService.getAllProjectEpics();
  members$ = this._MembersService.getProjectMembers();

  taskDetailsForm = this._FormBuilder.group<IUpdateTaskForm>({
    title: this._FormBuilder.nonNullable.control(''),
    epic_id: this._FormBuilder.control(null),
    status: this._FormBuilder.nonNullable.control('TO_DO'),
    assignee_id: this._FormBuilder.control(null),
    description: this._FormBuilder.control(null),
    due_date: this._FormBuilder.control(null),
  });

  ngOnInit() {
    this.taskId.set(this._ActivatedRoute.snapshot.queryParamMap.get('taskId'));
    this._TasksService
      .getTask(this.taskId())
      .pipe(map((task) => task[0]))
      .subscribe((task) => {
        this.task.set(task);
        this.taskDetailsForm.patchValue({
          title: task.title,
          assignee_id: task.assignee.id,
          description: task.description,
          due_date: task.due_date ? new Date(task.due_date) : null,
          epic_id: task.epic.id,
          status: task.status as IStatus,
        });
      });
  }

  close() {
    this.closeModal.emit();
  }

  saveChanges(field: keyof IUpdateTaskForm) {
    const originalTask = {
      title: this.task()?.title,
      assignee_id: this.task()?.assignee.id,
      description: this.task()?.description,
      due_date: this.task()?.due_date,
      epic_id: this.task()?.epic.id,
      status: this.task()?.status,
    };
    if (originalTask[field] === this.taskDetailsForm.get(field)?.value) {
      return;
    }

    this._TasksService.updateTaskDetails(this.taskId() as string, {
      [field]: this.taskDetailsForm.get(field)?.value,
    }).subscribe({next:()=>{
      this._TasksService.refreshTasks();
    },error:()=>{
       this._Toastr.error(`Failed to drag and drop task, try again later`);
    }});
  }
}
