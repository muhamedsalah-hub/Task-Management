import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../../core/services/projects.service';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { catchError, map, of, startWith, tap } from 'rxjs';
import { IProjectsState } from '../../../core/interfaces/Projects/types';
import { RouterLink } from '@angular/router';
import { EmptyProjectsComponent } from '../empty-projects/empty-projects.component';
import { ProjectsSkeletonComponent } from '../projects-skeleton/projects-skeleton.component';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    EmptyProjectsComponent,
    ProjectsSkeletonComponent,
    JsonPipe,
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css',
})
export class ProjectsListComponent {
  private readonly _ProjectsService = inject(ProjectsService);
  Projects$ = this._ProjectsService.getProjects().pipe(
    map(
      (projects): IProjectsState => ({
        error: false,
        loading: false,
        projects,
      }),
    ),
    startWith({
      error: false,
      loading: true,
      projects: null,
    } as IProjectsState),

    catchError(() =>
      of({ error: true, loading: false, projects: null } as IProjectsState),
    ),
  );
}
