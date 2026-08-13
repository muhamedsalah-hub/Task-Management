import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAddTaskForm, IStatus, ITasks } from '../interfaces/Projects/types';
import { environmet } from '../environment/environment';
import { ProjectContextService } from './project-context.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly _HtppClient = inject(HttpClient);
  private readonly _ProjectContextService = inject(ProjectContextService);

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
}
