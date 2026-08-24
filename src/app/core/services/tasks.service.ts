import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { IAddTaskForm, IStatus, ITasks } from '../interfaces/Projects/types';
import { environmet } from '../environment/environment';
import { ProjectContextService } from './project-context.service';
import {
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly _HtppClient = inject(HttpClient);
  private readonly _ProjectContextService = inject(ProjectContextService);
  limit: WritableSignal<number> = signal(5);
  totalTasks: WritableSignal<number> = signal(0);
  lastPage = computed(() => Math.ceil(this.totalTasks() / this.limit()));
  cache = signal(new Map<number, HttpResponse<ITasks[]>>());

  private readonly refreshTasks$ = new Subject<void>();

  tasks$ = this.refreshTasks$.pipe(
    startWith(undefined),
    switchMap(() => this.getAllProjectTasks()),
    shareReplay(1),
  );

  createEpicTask(body: {
    project_id: string;
    epic_id: string | null;
    title: string;
    description: string | null;
    assignee_id: string | null;
    due_date: string | null;
    status: IStatus;
  }): Observable<null> {
    return this._HtppClient.post<null>(
      `${environmet.baseUrl}/rest/v1/tasks`,
      body,
    );
  }

  getEpicTasks(epicId: string): Observable<ITasks[]> {
    return this._HtppClient.get<ITasks[]>(
      `${environmet.baseUrl}/rest/v1/project_tasks?epic_id=eq.${epicId}`,
    );
  }

  getAllProjectTasks(): Observable<ITasks[]> {
    return this._HtppClient.get<ITasks[]>(
      `${environmet.baseUrl}/rest/v1/project_tasks?project_id=eq.${this._ProjectContextService.projectId()}`,
    );
  }

  getPaginatedTasks(
    currentPage: number = 1,
  ): Observable<HttpResponse<ITasks[]>> {
    const cached = this.cache().get(currentPage);
    if (cached) {
      return of(cached);
    }
    const offset = (currentPage - 1) * this.limit();
    return this._HtppClient.get<ITasks[]>(
      `${environmet.baseUrl}/rest/v1/project_tasks?project_id=eq.${this._ProjectContextService.projectId()}&limit=${this.limit()}&offset=${offset}`,
      { observe: 'response' },
    );
  }

  getTask(taskId: string | null): Observable<ITasks[]> {
    return this._HtppClient.get<ITasks[]>(
      `${environmet.baseUrl}/rest/v1/project_tasks?project_id=eq.${this._ProjectContextService.projectId()}&id=eq.${taskId}`,
    );
  }

  refreshTasks() {
    this.refreshTasks$.next();
  }

  clearCache() {
    this.cache().clear();
  }
}
