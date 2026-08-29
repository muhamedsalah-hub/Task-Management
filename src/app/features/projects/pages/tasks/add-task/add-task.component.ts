import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { FieldErrorComponent } from '../../../../../shared/field-error/field-error.component';
import {
  IAddTaskForm,
  IStatus,
} from '../../../../../core/interfaces/Projects/types';
import { MembersService } from '../../../../../core/services/members.service';
import { EpicService } from '../../../../../core/services/epic.service';
import { pipe, tap } from 'rxjs';
import { MaxLengthStringPipe } from '../../../../../core/pipes/max-length-string.pipe';
import { ProjectContextService } from '../../../../../core/services/project-context.service';
import { TasksService } from '../../../../../core/services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { statusValues } from '../../../../../core/data/data';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgClass,
    FieldErrorComponent,
    RouterLink,
    AsyncPipe,
    MaxLengthStringPipe,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  readonly statusValues = statusValues;
  readonly today = signal(new Date());
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _MembersService = inject(MembersService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _TasksService = inject(TasksService);
  private readonly _EpicService = inject(EpicService);
  readonly _ProjectContextService = inject(ProjectContextService);
  epics$ = this._EpicService.getAllProjectEpics();
  members$ = this._MembersService.getProjectMembers();

  addTaskForm = this._FormBuilder.group<IAddTaskForm>({
    project_id: this._FormBuilder.nonNullable.control(
      this._ProjectContextService.projectId() as string,
    ),
    epic_id: this._FormBuilder.control(null),
    title: this._FormBuilder.nonNullable.control('', Validators.required),
    description: this._FormBuilder.control(null),
    assignee_id: this._FormBuilder.control(null),
    due_date: this._FormBuilder.control(null),
    status: this._FormBuilder.nonNullable.control('TO_DO'),
  });

  ngOnInit() {
    const epic_id = this._ActivatedRoute.snapshot.queryParamMap.get('epic_id');
    const status = this._ActivatedRoute.snapshot.queryParamMap.get('status');
    if (epic_id) {
      this.addTaskForm.patchValue({ epic_id });
    }
    if (status) {
      this.addTaskForm.patchValue({ status } as { status: IStatus });
    }
  }

  addTaskSubmission() {
    if (this.addTaskForm.valid) {
      const body = this.addTaskForm.getRawValue();
      const formatedDate =
        this.addTaskForm.getRawValue().due_date?.toISOString() || null;
      this._TasksService
        .createEpicTask({ ...body, due_date: formatedDate })
        .subscribe(() => {
          this._ToastrService.success('Task is created successfully');
          this._TasksService.clearCache();
        });
    }
  }
}
