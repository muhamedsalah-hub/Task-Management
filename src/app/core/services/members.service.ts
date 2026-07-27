import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmet } from '../environment/environment';
import { IProjectMembers } from '../interfaces/Projects/types';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private readonly _HttpClient = inject(HttpClient);

  getProjectMembers(projectId: string): Observable<IProjectMembers[]> {
    return this._HttpClient.get<IProjectMembers[]>(
      `${environmet.baseUrl}/rest/v1/get_project_members?project_id=eq.${projectId}`,
    );
  }
}
