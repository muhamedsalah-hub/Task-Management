import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ProjectsService } from '../../../../../core/services/projects.service';
import { EmptyProjectsComponent } from '../../../components/projects/empty-projects/empty-projects.component';
import { ProjectsSkeletonComponent } from '../../../components/projects/projects-skeleton/projects-skeleton.component';
import { ErrorPageComponent } from '../../../components/shared/error-page/error-page.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { IProjectsState } from '../../../../../core/interfaces/Projects/types';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    EmptyProjectsComponent,
    ProjectsSkeletonComponent,
    ErrorPageComponent,
    PaginationComponent,
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css',
})
export class ProjectsListComponent {
  currentPage: WritableSignal<number> = signal(1);
  readonly _ProjectsService = inject(ProjectsService);
  readonly _Router = inject(Router);

  Projects$ = toObservable(this.currentPage).pipe(
    switchMap((page) => {
      if (this._ProjectsService.cache().has(page)) {
        return of({
          loading: false,
          error: false,
          projects: this._ProjectsService.cache().get(page)!.body,
        });

      } else {
        return this._ProjectsService.getProjects(page).pipe(
          tap((res) => {
            this._ProjectsService.totalProjects.set(
              Number(res.headers.get('content-range')?.split('/')[1] as string),
            );
            if (!this._ProjectsService.cache().has(page)) {
              this._ProjectsService.cache.update((cache) => {
                const newCache = new Map(cache);
                newCache.set(page, res);
                return newCache;
              });
            }
          }),
          map(
            (res): IProjectsState => ({
              error: false,
              loading: false,
              projects: res.body,
            }),
          ),
          startWith({
            error: false,
            loading: true,
            projects: null,
          } as IProjectsState),
          catchError(() =>
            of({
              error: true,
              loading: false,
              projects: null,
            } as IProjectsState),
          ),
        );
      }
    }),
  );

  NextPage() {
    this.currentPage.update((c) => c + 1);
  }

  PrevPage() {
    this.currentPage.update((c) => c - 1);
  }
}
