import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectContextService } from '../../../../../core/services/project-context.service';
import { TasksService } from '../../../../../core/services/tasks.service';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
} from '../../../../../../../node_modules/@angular/common';
import { catchError, map, of, startWith, tap } from 'rxjs';
import { TrimTextPipe } from '../../../../../core/pipes/trim-text.pipe';
import {
  ITasksState,
  statusValues,
} from '../../../../../core/interfaces/Projects/types';
import { ProjectTasksSkeletonComponent } from '../../../components/tasks/projects/project-tasks-skeleton/project-tasks-skeleton.component';
import { ErrorPageComponent } from '../../../components/error-page/error-page.component';
import { EmptyProjectTasksComponent } from '../../../components/tasks/projects/empty-project-tasks/empty-project-tasks.component';

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    AsyncPipe,
    TrimTextPipe,
    DatePipe,
    ProjectTasksSkeletonComponent,
    ErrorPageComponent,
    EmptyProjectTasksComponent,
  ],
  templateUrl: './project-tasks.component.html',
  styleUrl: './project-tasks.component.css',
})
export class ProjectTasksComponent implements OnInit {
  statusValues = statusValues;
  view: WritableSignal<string> = signal('board');
  private readonly _TasksService = inject(TasksService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  readonly _ProjectContextService = inject(ProjectContextService);
  tasks$ = this._TasksService.getAllProjectTasks().pipe(
    tap((res) => {
      console.log(res);
    }),
    map((tasks): ITasksState => ({ error: false, loading: false, tasks })),
    startWith({ error: false, loading: true, tasks: null } as ITasksState),
    catchError(() =>
      of({ error: true, loading: false, tasks: null } as ITasksState),
    ),
  );

  ngOnInit() {
    this._ActivatedRoute.queryParamMap.subscribe((params) => {
      const view = params.get('view');
      this.view.set(view as string);
    });
  }
}
