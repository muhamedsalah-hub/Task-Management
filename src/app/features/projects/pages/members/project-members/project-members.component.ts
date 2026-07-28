import {
  Component,
  inject,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';

import { catchError, map, of, startWith, tap } from 'rxjs';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { TrimTextPipe } from '../../../../../core/pipes/trim-text.pipe';
import { MembersSkeletonComponent } from '../../../components/members-skeleton/members-skeleton.component';
import { ErrorPageComponent } from '../../../shared/error-page/error-page.component';
import { ProjectContextService } from '../../../../../core/services/project-context.service';
import { MembersService } from '../../../../../core/services/members.service';
import { IMembersState } from '../../../../../core/interfaces/Projects/types';


@Component({
  selector: 'app-project-members',
  standalone: true,
  imports: [
    AsyncPipe,
    TrimTextPipe,
    MembersSkeletonComponent,
    ErrorPageComponent,
  ],
  templateUrl: './project-members.component.html',
  styleUrl: './project-members.component.css',
})
export class ProjectMembersComponent {
  private readonly _MembersService = inject(MembersService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  isMobile: WritableSignal<boolean> = signal(false);

  members$ = this._MembersService
    .getProjectMembers()
    .pipe(
      map(
        (res): IMembersState => ({
          error: false,
          loading: false,
          members: res,
        }),
      ),
      startWith({ loading: true, error: false, members: null }),
      catchError(() => of({ loading: false, error: true, members: null })),
    );

  ngOnInit() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const mediaQuery = window.matchMedia('(max-width:767px');
      this.isMobile.set(mediaQuery.matches);
      mediaQuery.addEventListener('change', (event) => {
        this.isMobile.set(event.matches);
      });
    }
  }
}
