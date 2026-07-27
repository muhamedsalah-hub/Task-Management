import {
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  AsyncPipe,
  DatePipe,
  isPlatformBrowser,
  NgClass,
} from '@angular/common';
import { catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ProjectsService } from '../../../../../core/services/projects.service';
import { EmptyProjectsComponent } from '../../../components/empty-projects/empty-projects.component';import { ProjectsSkeletonComponent } from '../../../components/projects-skeleton/projects-skeleton.component';
import { ErrorPageComponent } from '../../../shared/error-page/error-page.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { IProjectsState } from '../../../../../core/interfaces/Projects/types';


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

export class ProjectsListComponent implements OnInit {
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

  ngOnInit() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const mediaQuery = window.matchMedia('(max-width: 767px)');
      this.isMobile.set(mediaQuery.matches);
      mediaQuery.addEventListener('change', (event) => {
        this.isMobile.set(event.matches);
      });
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
        return of({
          loading: false,
          error: false,
          projects: this._ProjectsService.cache().get(page)!.body,
        });
      } else {
        return request$.pipe(
          startWith({ error: false, loading: true, projects: null }),
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


