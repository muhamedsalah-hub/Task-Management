import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAddTaskForm, IStatus } from '../interfaces/Projects/types';
import { environmet } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly _HtppClient = inject(HttpClient);

  createEpicTask(body: {
    project_id: string;
    epic_id: string | null;
    title: string;
    description: string | null;
    assignee_id: string | null;
    due_date: string | null;
    status: IStatus;
  }) {
    return this._HtppClient.post(`${environmet.baseUrl}/rest/v1/tasks`, body);
  }
}
