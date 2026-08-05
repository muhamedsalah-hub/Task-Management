import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { environmet } from '../environment/environment';
import { Observable, of, Subject } from 'rxjs';
import { ProjectContextService } from './project-context.service';
import { IProjectEpics } from '../interfaces/Projects/types';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  private readonly _ProjectContextService = inject(ProjectContextService);
  private readonly _HttpClient = inject(HttpClient);
  readonly limit: WritableSignal<number> = signal(3);
  refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();
  totalEpics: WritableSignal<number> = signal(0);
  lastPage = computed(() => Math.ceil(this.totalEpics() / this.limit()));

  createProjectEpic(body: {
    title: string;
    description: string ;
    assignee_id: string;
    project_id: string;
    deadline: string;
  }) {
    return this._HttpClient.post(`${environmet.baseUrl}/rest/v1/epics`, body);
  }

  getAllProjectEpics(): Observable<IProjectEpics[]> {
    return this._HttpClient.get<IProjectEpics[]>(
      `${environmet.baseUrl}/rest/v1/project_epics?project_id=eq.${this._ProjectContextService.projectId()}`,
    );
  }

  getProjectEpics(
    currentPage: number = 1,
  ): Observable<HttpResponse<IProjectEpics[]>> {
    const offset = (currentPage - 1) * this.limit();

    return this._HttpClient.get<IProjectEpics[]>(
      `${environmet.baseUrl}/rest/v1/project_epics?project_id=eq.${this._ProjectContextService.projectId()}&limit=${this.limit()}&offset=${offset}`,
      { observe: 'response' },
    );
  }

  getProjectEpicById(epicId: string): Observable<IProjectEpics[]> {
    return this._HttpClient.get<IProjectEpics[]>(
      `${environmet.baseUrl}/rest/v1/project_epics?project_id=eq.${this._ProjectContextService.projectId()}&epic_id=eq.${epicId}`,
    );
  }

  updateProjectEpic(
    epicId: string,
    body: {
      title: string | null;
      description: string | null;
      assignee_id: string | null;
      deadline: string | null;
    },
  ): Observable<null> {
    return this._HttpClient.patch<null>(
      `${environmet.baseUrl}/rest/v1/epics?epic_id=eq.${epicId}`,
      body,
    );
  }

  refreshEpics() {
    this.refreshSubject.next();
  }
}
