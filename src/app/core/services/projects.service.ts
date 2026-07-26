import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { environmet } from '../environment/environment';
import { IProjects } from '../interfaces/Projects/types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly _HttpClient = inject(HttpClient);
  totalProjects: WritableSignal<number> = signal(0);
  limit: WritableSignal<number> = signal(6);
  lastPage = computed(() => Math.ceil(this.totalProjects() / this.limit()));
  cache = signal(new Map<number, HttpResponse<IProjects[]>>());

  createNewProject(body: {
    name: string;
    description: string;
  }): Observable<null> {
    return this._HttpClient.post<null>(
      `${environmet.baseUrl}/rest/v1/projects`,
      body,
    );
  }

  editProject(
    body: {
      name: string;
      description: string;
    },
    projectId: string,
  ): Observable<any> {
    return this._HttpClient.patch<any>(
      `${environmet.baseUrl}/rest/v1/projects?id=eq.${projectId}`,
      body,
    );
  }

  getProjects(currentPage: number = 1): Observable<HttpResponse<IProjects[]>> {
    const cached = this.cache().get(currentPage);
    if (cached) {
      return of(cached);
    }

    const offset = (currentPage - 1) * this.limit();
    return this._HttpClient.get<IProjects[]>(
      `${environmet.baseUrl}/rest/v1/rpc/get_projects?limit=${this.limit()}&offset=${offset}`,
      { observe: 'response' },
    );
  }

  getProjectById(projectId: string): Observable<IProjects[]> {
    return this._HttpClient.get<IProjects[]>(
      `${environmet.baseUrl}/rest/v1/rpc/get_projects?id=eq.${projectId}`,
    );
  }

  clearCache() {
    this.cache().clear();
  }
}
