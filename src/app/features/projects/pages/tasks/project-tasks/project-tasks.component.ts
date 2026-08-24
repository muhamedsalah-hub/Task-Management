import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  IGroupedStatus,
  ITasks,
  ITasksState,
} from '../../../../../core/interfaces/Projects/types';
import { ProjectTasksSkeletonComponent } from '../../../components/tasks/projects/project-tasks-skeleton/project-tasks-skeleton.component';
import { ErrorPageComponent } from '../../../components/shared/error-page/error-page.component';
import { EmptyProjectTasksComponent } from '../../../components/tasks/projects/empty-project-tasks/empty-project-tasks.component';
import { statusValues } from '../../../../../core/data/data';
import { BoardViewTasksComponent } from '../../../components/tasks/projects/board-view-tasks/board-view-tasks.component';
import { ListViewTasksComponent } from '../../../components/tasks/projects/list-view-tasks/list-view-tasks.component';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

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
    BoardViewTasksComponent,
    ListViewTasksComponent,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatOption,
  ],
  templateUrl: './project-tasks.component.html',
  styleUrl: './project-tasks.component.css',
})
export class ProjectTasksComponent implements OnInit {
  readonly StatusValues = statusValues;

  selectedView: WritableSignal<'board' | 'list'> = signal('board');
  groupedTasks = signal(new Map<keyof IGroupedStatus, ITasks[]>());
  private readonly _TasksService = inject(TasksService);
  private readonly _Router = inject(Router);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  readonly _ProjectContextService = inject(ProjectContextService);

  tasks$ = this._TasksService.tasks$.pipe(
    tap((tasks) => {
      const groupedValues: IGroupedStatus = {
        TO_DO: [],
        DONE: [],
        IN_PROGRESS: [],
        BLOCKED: [],
        IN_REVIEW: [],
        READY_FOR_PRODUCTION: [],
        READY_FOR_QA: [],
        REOPENED: [],
      };
      const groupedObject = tasks.reduce((prev, curr) => {
        const status = curr.status as keyof IGroupedStatus;
        prev[status].push(curr);
        return prev;
      }, groupedValues);

      this.groupedTasks.set(
        new Map(
          Object.entries(groupedObject) as [keyof IGroupedStatus, ITasks[]][],
        ),
      );
    }),
    map((tasks): ITasksState => ({ error: false, loading: false, tasks })),
    startWith({ error: false, loading: true, tasks: null } as ITasksState),
    catchError(() =>
      of({ error: true, loading: false, tasks: null } as ITasksState),
    ),
  );

  ngOnInit() {
    this._ActivatedRoute.queryParamMap.subscribe((params) => {
      const view = params.get('view') as 'list' | 'board';
      this.selectedView.set(view);
    });
  }

  changeView(view: 'list' | 'board') {
    this._Router.navigate([], {
      queryParams: { view },
      queryParamsHandling: 'merge',
    });
  }
}
