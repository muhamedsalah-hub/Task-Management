import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldErrorComponent } from '../../../../../shared/field-error/field-error.component';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { finalize } from 'rxjs';
import { projectFormBase } from '../../../../../core/utils/classes';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule, FieldErrorComponent, RouterLink, NgClass],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent extends projectFormBase {
  override projectFormSubmission() {
    this.isLoading = true;
    if (this.projectForm.valid) {
      this._ProjectsService
        .createNewProject(this.projectForm.value)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(() => {
          this._ProjectsService.clearCache();
          this._ToastrService.success('Project created successfully');
          this.projectForm.reset();
        });
    }
  }
}
