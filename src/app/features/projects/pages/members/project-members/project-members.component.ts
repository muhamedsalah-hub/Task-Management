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
import { MembersSkeletonComponent } from '../../../components/members/members-skeleton/members-skeleton.component';
import { ErrorPageComponent } from '../../../components/shared/error-page/error-page.component';
import { MembersService } from '../../../../../core/services/members.service';
import { IMembersState } from '../../../../../core/interfaces/Projects/types';
import { InviteMembersPopupComponent } from '../../../components/members/invite-members-popup/invite-members-popup.component';

@Component({
  selector: 'app-project-members',
  standalone: true,
  imports: [
    AsyncPipe,
    TrimTextPipe,
    MembersSkeletonComponent,
    ErrorPageComponent,
    InviteMembersPopupComponent,
  ],
  templateUrl: './project-members.component.html',
  styleUrl: './project-members.component.css',
})
export class ProjectMembersComponent {
  private readonly _MembersService = inject(MembersService);
  isOpen = signal<boolean>(false);

  members$ = this._MembersService.getProjectMembers().pipe(
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

  closePopup() {
    this.isOpen.set(false);
  }

  openPopup() {
    this.isOpen.set(true);
  }
}
