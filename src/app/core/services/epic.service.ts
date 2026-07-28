import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environmet } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  private readonly _HttpClient = inject(HttpClient);

  createProjectEpic(body: {
    title: string;
    description: string;
    assignee_id: string;
    project_id: string;
    deadline: string;
  }) {
    return this._HttpClient.post(`${environmet.baseUrl}/rest/v1/epics`, body);
  }
}
