import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable } from 'rxjs';
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

  createNewProject(body: {
    name: string;
    description: string;
  }): Observable<any> {
    return this._HttpClient.post(
      `${environmet.baseUrl}/rest/v1/projects`,
      body,
    );
  }

  getProjects(currentPage: number = 1): Observable<HttpResponse<IProjects[]>> {
    const offset = (currentPage - 1) * this.limit();
    return this._HttpClient.get<IProjects[]>(
      `${environmet.baseUrl}/rest/v1/rpc/get_projects?limit=${this.limit()}&offset=${offset}`,
      { observe: 'response' },
    );
  }
}
