import { inject } from '@angular/core';
import { ProjectValidationRules } from './validations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectsService } from '../services/projects.service';
import { ToastrService } from 'ngx-toastr';

export abstract class projectFormBase {
  isLoading: boolean = false;
  validations = ProjectValidationRules;

  protected readonly _FormBuilder = inject(FormBuilder);
  protected readonly _ProjectsService = inject(ProjectsService);
  protected readonly _ToastrService = inject(ToastrService);

  projectForm: FormGroup = this._FormBuilder.group({
    name: ['', this.validations.name],
    description: ['', this.validations.description],
  });

  abstract projectFormSubmission(): void;
}
