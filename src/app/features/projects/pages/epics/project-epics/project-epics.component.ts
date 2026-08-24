import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EpicService } from '../../../../../core/services/epic.service';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  IEpicsState,
  IProjectEpics,
} from '../../../../../core/interfaces/Projects/types';
import { EpicsSkeletonComponent } from '../../../components/epics/epics-skeleton/epics-skeleton.component';
import { ErrorPageComponent } from '../../../components/shared/error-page/error-page.component';
import { EmptyEpicsComponent } from '../../../components/epics/empty-epics/empty-epics.component';
import { TrimTextPipe } from '../../../../../core/pipes/trim-text.pipe';
import { toObservable } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import { EpicDetailsPopupComponent } from '../../../components/epics/epic-details-popup/epic-details-popup.component';
import { ProjectContextService } from '../../../../../core/services/project-context.service';
import { FormsModule } from '@angular/forms';

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
    EpicDetailsPopupComponent,
    FormsModule,
  ],
  templateUrl: './project-epics.component.html',
  styleUrl: './project-epics.component.css',
})
export class ProjectEpicsComponent {
  readonly _EpicService = inject(EpicService);
  readonly _ProjectContextService = inject(ProjectContextService);
  currentPage: WritableSignal<number> = signal(1);
  isOpen: WritableSignal<boolean> = signal(false);
  EpicDetails: WritableSignal<IProjectEpics | null> = signal(null);
  searchedEpic = signal<string>('');

  Epics$ = combineLatest([
    toObservable(this.currentPage),
    toObservable(this.searchedEpic).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.currentPage.set(1)),
    ),
    this._EpicService.refresh$.pipe(startWith(undefined)),
  ]).pipe(
    switchMap(([currentPage, search]) => {
      return this._EpicService.getProjectEpics(currentPage, search).pipe(
        tap((res) => {
          this._EpicService.totalEpics.set(
            Number(res.headers.get('content-range')?.split('/')[1]),
          );
        }),
        map(
          (res): IEpicsState => ({
            error: false,
            loading: false,
            epics: res.body,
          }),
        ),
        startWith({
          error: false,
          loading: true,
          epics: null,
        } as IEpicsState),

        catchError(() =>
          of({ error: true, loading: false, epics: null } as IEpicsState),
        ),
      );
    }),
  );

  nextPage() {
    this.currentPage.update((p) => p + 1);
  }

  prevPage() {
    this.currentPage.update((p) => p - 1);
  }

  closePopup() {
    this.isOpen.set(false);
  }

  openPopup() {
    this.isOpen.set(true);
  }

  getEpicDetails(epicId: string) {
    this._EpicService
      .getProjectEpicById(epicId)
      .pipe(map((res) => res[0]))
      .subscribe((epic) => {
        this.EpicDetails.set(epic);
        this.openPopup();
      });
  }
}
