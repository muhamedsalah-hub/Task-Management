import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EpicService } from '../../../../../core/services/epic.service';
import { catchError, map, of, startWith, tap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { IEpicsState } from '../../../../../core/interfaces/Projects/types';
import { EpicsSkeletonComponent } from "../../../components/epics/epics-skeleton/epics-skeleton.component";
import { ErrorPageComponent } from "../../../shared/error-page/error-page.component";
import { EmptyEpicsComponent } from "../../../components/epics/empty-epics/empty-epics.component";
import { TrimTextPipe } from '../../../../../core/pipes/trim-text.pipe';

@Component({
  selector: 'app-project-epics',
  standalone: true,
  imports: [RouterLink, AsyncPipe, EpicsSkeletonComponent, ErrorPageComponent, EmptyEpicsComponent,TrimTextPipe,DatePipe],
  templateUrl: './project-epics.component.html',
  styleUrl: './project-epics.component.css',
})
export class ProjectEpicsComponent {
  private readonly _EpicService = inject(EpicService);

  Epics$ = this._EpicService.getProjectEpics().pipe(
    tap((res)=>{
      console.log(res);
      
    }),
    map((res): IEpicsState => ({ error: false, loading: false, epics: res })),
    startWith({ loading: true, error: false, epics: null }),
    catchError(() =>
      of({ error: true, loading: false, epics: null } as IEpicsState),
    ),
  );
}
