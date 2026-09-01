import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environmet } from '../environment/environment';
import { IProjectMembers } from '../interfaces/Projects/types';
import { ProjectContextService } from './project-context.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _ProjectContextService = inject(ProjectContextService);
  private projectMembers$ = this._HttpClient
    .get<
      IProjectMembers[]
    >(`${environmet.baseUrl}/rest/v1/get_project_members?project_id=eq.${this._ProjectContextService.projectId()}`)
    .pipe(shareReplay(1));

  getProjectMembers(): Observable<IProjectMembers[]> {
    return this.projectMembers$;
  }
}
