import {
  Component,
  computed,
  HostListener,
  inject,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProjectsService } from '../../../core/services/projects.service';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { catchError, finalize, map, of, startWith, switchMap, tap } from 'rxjs';
import {
  IProjects,
  IProjectsState,
} from '../../../core/interfaces/Projects/types';
import { Router, RouterLink } from '@angular/router';
import { EmptyProjectsComponent } from '../empty-projects/empty-projects.component';
import { ProjectsSkeletonComponent } from '../projects-skeleton/projects-skeleton.component';
import { ErrorPageComponent } from '../../shared/error-page/error-page.component';
import { toObservable } from '@angular/core/rxjs-interop';

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
    NgClass,
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css',
})
export class ProjectsListComponent {
  currentPage: WritableSignal<number> = signal(1);
  isMobile = window.matchMedia('(max-width:767px');
  readonly _ProjectsService = inject(ProjectsService);
  readonly _Router = inject(Router);
  readonly visiblePages = computed(() => {
    const current = this.currentPage();
    const last = this._ProjectsService.lastPage();
    const start = Math.min(current, last - 1); //4
    const end = Math.min(last, start + 1); //5
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  Projects$ = toObservable(this.currentPage).pipe(
    switchMap((page) => {
      return this._ProjectsService.getProjects(page).pipe(
        tap((res) => {
          this._ProjectsService.totalProjects.set(
            Number(res.headers.get('content-range')?.split('/')[1] as string),
          );
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
          of({ error: true, loading: false, projects: null } as IProjectsState),
        ),
      );
    }),
  );

  nextButtonPage() {
    if (this.currentPage() !== this._ProjectsService.lastPage()) {
      this.currentPage.update((page) => page + 1);
      if (this.isMobile.matches) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  prevButtonPage() {
    if (this.currentPage() !== 1) {
      this.currentPage.update((page) => page - 1);
      if (this.isMobile.matches) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
}
