import { Component, inject, Input, signal } from '@angular/core';
import { TasksService } from '../../../../../../core/services/tasks.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, of, startWith, switchMap, tap } from 'rxjs';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { ITasksState } from '../../../../../../core/interfaces/Projects/types';
import { TrimTextPipe } from '../../../../../../core/pipes/trim-text.pipe';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { TaskDetailsModalService } from '../../../shared/services/task-details-modal.service';
import { TaskDetailsPopUpComponent } from '../../../shared/task-details-pop-up/task-details-pop-up.component';

@Component({
  selector: 'app-list-view-tasks',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    DatePipe,
    TrimTextPipe,
    PaginationComponent,
    TaskDetailsPopUpComponent,
  ],
  providers: [TaskDetailsModalService],
  templateUrl: './list-view-tasks.component.html',
  styleUrl: './list-view-tasks.component.css',
})
export class ListViewTasksComponent {
  readonly _TasksService = inject(TasksService);
  readonly _TaskDetailsModalService = inject(TaskDetailsModalService);
  currentPage = signal<number>(1);

  tasks$ = toObservable(this.currentPage).pipe(
    switchMap((page) => {
      if (this._TasksService.cache().get(page)) {
        return of({
          error: false,
          loading: false,
          tasks: this._TasksService.cache().get(page)?.body,
        } as ITasksState);
      } else {
        return this._TasksService.getPaginatedTasks(page).pipe(
          tap((res) => {
            this._TasksService.totalTasks.set(
              Number(res.headers.get('content-range')?.split('/')[1]),
            );
            if (!this._TasksService.cache().get(page)) {
              this._TasksService.cache.update((oldCache) => {
                const newCache = new Map(oldCache);
                newCache.set(page, res);
                return newCache;
              });
            }
          }),
          map(
            (res): ITasksState => ({
              error: false,
              loading: false,
              tasks: res.body,
            }),
          ),
          startWith({
            loading: true,
            error: false,
            tasks: null,
          } as ITasksState),
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
