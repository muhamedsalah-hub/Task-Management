import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environmet } from '../environment/environment';
import { Observable } from 'rxjs';
import { ProjectContextService } from './project-context.service';
import { IProjectEpics } from '../interfaces/Projects/types';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _ProjectContextService = inject(ProjectContextService);

  createProjectEpic(body: {
    title: string;
    description: string;
    assignee_id: string;
    project_id: string;
    deadline: string;
  }) {
    return this._HttpClient.post(`${environmet.baseUrl}/rest/v1/epics`, body);
  }

  getProjectEpics():Observable<IProjectEpics[]>{
    return this._HttpClient.get<IProjectEpics[]>(`${environmet.baseUrl}/rest/v1/project_epics?project_id=eq.${this._ProjectContextService.projectId()}`)
  }
}
