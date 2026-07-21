import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmet } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly _HttpClient = inject(HttpClient);

  createNewProject(body: {
    name: string;
    description: string;
  }): Observable<any> {
    return this._HttpClient.post<any>(
      `${environmet.baseUrl}/rest/v1/projects`,
      body,
    );
  }
}
