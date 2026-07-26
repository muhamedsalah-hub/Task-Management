import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectValidationRules } from '../../../../core/utils/validations';
import { FieldErrorComponent } from '../../../../shared/field-error/field-error.component';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ProjectsService } from '../../../../core/services/projects.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule, FieldErrorComponent, RouterLink, NgClass],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent {
  isLoading: boolean = false;
  validations = ProjectValidationRules;

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ProjectsService = inject(ProjectsService);
  private readonly _ToastrService = inject(ToastrService);

  projectForm: FormGroup = this._FormBuilder.group({
    name: ['', this.validations.name],
    description: ['', this.validations.description],
  });

  projectFormSubmission() {
    this.isLoading = true;
    if (this.projectForm.valid) {
      this._ProjectsService
        .createNewProject(this.projectForm.value)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(() => {
          this._ToastrService.success('Project created successfully');
          this.projectForm.reset();
        });
    }
  }
}
