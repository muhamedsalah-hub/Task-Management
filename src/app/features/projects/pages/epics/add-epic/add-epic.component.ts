import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { MembersService } from '../../../../../core/services/members.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ProjectContextService } from '../../../../../core/services/project-context.service';
import { EpicValidationRules } from '../../../../../core/utils/validations';
import { EpicService } from '../../../../../core/services/epic.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import {  RouterLink } from '@angular/router';
import { FieldErrorComponent } from '../../../../../shared/field-error/field-error.component';

@Component({
  selector: 'app-add-epic',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AsyncPipe,
    ReactiveFormsModule,
    NgClass,
    FieldErrorComponent,
    RouterLink,
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './add-epic.component.html',
  styleUrls: ['./add-epic.component.css'],
})
export class AddEpicComponent {
  today: WritableSignal<Date> = signal(new Date());
  validations = EpicValidationRules;
  isLoading: WritableSignal<boolean> = signal(false);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _DatePipe = inject(DatePipe);
  private readonly _EpicService = inject(EpicService);
  private readonly _MembersService = inject(MembersService);
  private readonly _ProjectContextService = inject(ProjectContextService);

  members$ = this._MembersService.getProjectMembers();

  epicForm: FormGroup = this._FormBuilder.group({
    title: ['', this.validations.title],
    description: [null],
    assignee_id: [null],
    project_id: [this._ProjectContextService.projectId()],
    deadline: [new Date()],
  });

  epicSubmission() {
    if (this.epicForm.valid) {
      this.isLoading.set(true);
      const formated = this._DatePipe.transform(
        this.epicForm.value.deadline,
        'yyyy-MM-dd',
      );

      const body = { ...this.epicForm.value, deadline: formated };
      this._EpicService
        .createProjectEpic(body)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe(() => {
          this._ToastrService.success('Epic created successfully');
          this.epicForm.reset();
        });
    }
  }
}
