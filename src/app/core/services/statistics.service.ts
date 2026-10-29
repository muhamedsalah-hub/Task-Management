import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environmet } from '../environment/environment';
import { IStatisticsBody } from '../interfaces/Projects/types';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private readonly _HttpClient=inject(HttpClient);

  getTasksStatistics(body:IStatisticsBody){
    return this._HttpClient.post(`${environmet.baseUrl}/rest/v1/rpc/get_tasks_calendar_stats`,body)
  }



}
