import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { FieldErrorComponent } from '../../../../../shared/field-error/field-error.component';
import { IAddTaskForm } from '../../../../../core/interfaces/Projects/types';

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
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  readonly today = signal(new Date());
  readonly _FormBuilder = inject(FormBuilder);
  statusValues = [
    'TO_DO',
    'IN_PROGRESS',
    'BLOCKED',
    'IN_REVIEW',
    'READY_FOR_QA',
    'REOPENED',
    'READY_FOR_PRODUCTION',
    'DONE',
  ];

  addTaskForm = this._FormBuilder.group<IAddTaskForm>({
    project_id: this._FormBuilder.nonNullable.control('', Validators.required),
    epic_id: this._FormBuilder.control(null),
    title: this._FormBuilder.nonNullable.control('', Validators.required),
    description: this._FormBuilder.control(null),
    assignee_id: this._FormBuilder.control(null),
    due_date: this._FormBuilder.control(null),
    status: this._FormBuilder.nonNullable.control('TO_DO'),
  });
}
