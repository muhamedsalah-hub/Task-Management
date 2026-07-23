import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmet } from '../environment/environment';
import { IProjects } from '../interfaces/Projects/types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly _HttpClient = inject(HttpClient);

  createNewProject(body: {
    name: string;
    description: string;
  }): Observable<any> {
    return this._HttpClient.post(
      `${environmet.baseUrl}/rest/v1/projects`,
      body,
    );
  }

  getProjects(): Observable<IProjects[]> {
    return this._HttpClient.get<IProjects[]>(
      `${environmet.baseUrl}/rest/v1/rpc/get_projects`,
    );
  }
}
