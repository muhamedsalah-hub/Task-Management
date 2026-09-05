import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from '../../../../../core/services/members.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-accept-invitation',
  standalone: true,
  imports: [],
  templateUrl: './accept-invitation.component.html',
  styleUrl: './accept-invitation.component.css',
})
export class AcceptInvitationComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _MembersService = inject(MembersService);
  token = signal<string>('');

  ngOnInit() {
    this.token.set(this._ActivatedRoute.snapshot.queryParams['token']);
  }

  handleAcceptInvitation() {
    if (this.token()) {
      this._MembersService.AcceptInvitation(this.token()).subscribe({
        next: () => {
          this._ToastrService.success('Invitation Accepted Successfully');
          this._Router.navigate(['/Projects']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 403) {
            this._ToastrService.error('Access Denied');
          } else if (err.status >= 400) {
            this._ToastrService.error(
              'Something went wrong, Please try again later',
            );
          }
          this._AuthService.logout();
          this._Router.navigate(['']);
        },
      });
    }
  }
}
