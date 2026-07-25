import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProjectsService } from '../../../core/services/projects.service';
import {
  AsyncPipe,
  DatePipe,
  isPlatformBrowser,
  NgClass,
} from '@angular/common';
import { catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import {
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
  isMobile: WritableSignal<boolean> = signal(false);
  readonly _ProjectsService = inject(ProjectsService);
  readonly _PLATFORM_ID = inject(PLATFORM_ID);
  readonly _Router = inject(Router);
  readonly visiblePages = computed(() => {
    const current = this.currentPage();
    const last = this._ProjectsService.lastPage();
    const start = Math.min(current, last - 1);
    const end = Math.min(last, start + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.isMobile.set(window.matchMedia('(max-width: 767px)').matches);
    }
  }

  Projects$ = toObservable(this.currentPage).pipe(
    switchMap((page) => {
      const request$ = this._ProjectsService.getProjects(page).pipe(
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
        catchError(() =>
          of({ error: true, loading: false, projects: null } as IProjectsState),
        ),
      );
      if (this._ProjectsService.cache().has(page)) {
        return request$;
      } else {
        return request$.pipe(
          startWith({ error: true, loading: true, projects: null }),
        );
      }
    }),
  );

  nextButtonPage() {
    if (this.currentPage() !== this._ProjectsService.lastPage()) {
      this.currentPage.update((page) => page + 1);
      if (this.isMobile()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  prevButtonPage() {
    if (this.currentPage() !== 1) {
      this.currentPage.update((page) => page - 1);
      if (this.isMobile()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
}
