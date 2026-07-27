import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { finalize } from 'rxjs';

import { RouterLink } from "@angular/router";
import { FieldErrorComponent } from '../../../../../shared/field-error/field-error.component';
import { NgClass } from '@angular/common';
import { projectFormBase } from '../../../../../core/utils/classes';
import { ProjectContextService } from '../../../../../core/services/project-context.service';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FieldErrorComponent,
    NgClass,
    RouterLink
],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
})
export class EditProjectComponent extends projectFormBase implements OnInit {
  private readonly _ProjectContextService = inject(ProjectContextService);

  ngOnInit() {
    this._ProjectsService
      .getProjectById(this._ProjectContextService.projectId() as string)
      .subscribe((projects) => {
        this.projectForm.patchValue(projects[0]);
      });
  }

  override projectFormSubmission() {
    this.isLoading = true;
    if (this.projectForm.valid) {
      this._ProjectsService
        .editProject(
          this.projectForm.value,
          this._ProjectContextService.projectId() as string,
        )
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(() => {
          this._ProjectsService.clearCache();
          this._ToastrService.success('Project Updated successfully');
          this.projectForm.reset();
        });
    }
  }
}
