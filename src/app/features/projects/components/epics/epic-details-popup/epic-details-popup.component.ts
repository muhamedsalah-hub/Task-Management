import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { IProjectEpics } from '../../../../../core/interfaces/Projects/types';
import { TrimTextPipe } from '../../../../../core/pipes/trim-text.pipe';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EpicValidationRules } from '../../../../../core/utils/validations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MembersService } from '../../../../../core/services/members.service';
import { FieldErrorComponent } from '../../../../../shared/field-error/field-error.component';
import { EpicService } from '../../../../../core/services/epic.service';

@Component({
  selector: 'app-epic-details-popup',
  standalone: true,
  imports: [
    TrimTextPipe,
    DatePipe,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    AsyncPipe,
    FieldErrorComponent,
  ],
  templateUrl: './epic-details-popup.component.html',
  styleUrl: './epic-details-popup.component.css',
})
export class EpicDetailsPopupComponent implements OnInit {
  readonly validations = EpicValidationRules;
  today: WritableSignal<Date> = signal(new Date());
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _EpicService = inject(EpicService);
  private readonly _MembersService = inject(MembersService);
  @Input({ required: true }) EpicDetails!: IProjectEpics | null;
  @Output() closePopUpEmitter = new EventEmitter<void>();
  @Output() openPopUpEmitter = new EventEmitter<void>();

  members$ = this._MembersService.getProjectMembers();
  editEpicForm: FormGroup = this._FormBuilder.group({
    title: [null, this.validations.title],
    description: [null],
    assignee_id: [null],
    deadline: [null],
  });

  ngOnInit() {
    this.editEpicForm.patchValue({
      title: this.EpicDetails?.title,
      description: this.EpicDetails?.description,
      assignee_id: this.EpicDetails?.assignee?.sub,
      deadline: this.EpicDetails?.deadline,
    });
  }

  closePopUp() {
    this.closePopUpEmitter.emit();
  }

  openPopUp() {
    this.openPopUpEmitter.emit();
  }

  updateEpicDetailsSubmission(epicId: string) {
    this._EpicService
      .updateProjectEpic(epicId, this.editEpicForm.value)
      .subscribe(() => {
        this.closePopUp();
        this._EpicService.refreshEpics();
      });
  }
}
