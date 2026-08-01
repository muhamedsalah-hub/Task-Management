import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EpicService } from '../../../../../core/services/epic.service';
import { catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { IEpicsState } from '../../../../../core/interfaces/Projects/types';
import { EpicsSkeletonComponent } from '../../../components/epics/epics-skeleton/epics-skeleton.component';
import { ErrorPageComponent } from '../../../components/error-page/error-page.component';
import { EmptyEpicsComponent } from '../../../components/epics/empty-epics/empty-epics.component';
import { TrimTextPipe } from '../../../../../core/pipes/trim-text.pipe';
import { toObservable } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-project-epics',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    EpicsSkeletonComponent,
    ErrorPageComponent,
    EmptyEpicsComponent,
    TrimTextPipe,
    DatePipe,
    PaginationComponent,
  ],
  templateUrl: './project-epics.component.html',
  styleUrl: './project-epics.component.css',
})
export class ProjectEpicsComponent {
  readonly _EpicService = inject(EpicService);
  currentPage: WritableSignal<number> = signal(1);
  numOfItems: WritableSignal<number> = signal(0);

  Epics$ = toObservable(this.currentPage).pipe(
    switchMap((page) => {
      const request$ = this._EpicService.getProjectEpics(page).pipe(
        tap((res) => {
          this._EpicService.totalEpics.set(
            Number(res.headers.get('content-range')?.split('/')[1]),
          );
          this.numOfItems.set(res.body?.length || 0);

          if (!this._EpicService.cache().has(page)) {
            this._EpicService.cache.update((oldCache) => {
              const newCache = new Map(oldCache);
              newCache.set(page, res);
              return newCache;
            });
          }
        }),
        map(
          (res): IEpicsState => ({
            error: false,
            loading: false,
            epics: res.body,
          }),
        ),
        catchError(() =>
          of({ error: true, loading: false, epics: null } as IEpicsState),
        ),
      );

      if (this._EpicService.cache().has(page)) {
        return of({
          error: false,
          epics: this._EpicService.cache().get(page)?.body,
          loading: false,
        });
      } else {
        return request$.pipe(
          startWith({
            error: false,
            loading: true,
            epics: null,
          } as IEpicsState),
        );
      }
    }),
  );

  nextPage() {
    this.currentPage.update((p) => p + 1);
  }

  prevPage() {
    this.currentPage.update((p) => p - 1);
  }
}
