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

  getProjectMembers(): Observable<IProjectMembers[]> {
    return this._HttpClient.get<IProjectMembers[]>(
      `${environmet.baseUrl}/rest/v1/get_project_members?project_id=eq.${this._ProjectContextService.projectId()}`,
    );
  }

  inviteMember(email: string): Observable<null> {
    return this._HttpClient.post<null>(
      `${environmet.baseUrl}/rest/v1/rpc/invite_member`,
      {
        p_email: email,
        p_project_id: this._ProjectContextService.projectId() as string,
        p_app_url: 'http://localhost:4200',
        p_base_url: environmet.baseUrl,
      },
    );
  }

  AcceptInvitation(Emailtoken: string): Observable<any> {
    return this._HttpClient.post<any>(
      `${environmet.baseUrl}/rest/v1/rpc/accept_invitation`,
      {
        p_token: Emailtoken,
      },
    );
  }
}
