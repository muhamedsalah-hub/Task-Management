import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembersService } from '../../../../../core/services/members.service';
import { NgClass } from '../../../../../../../node_modules/@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invite-members-popup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './invite-members-popup.component.html',
  styleUrl: './invite-members-popup.component.css',
})
export class InviteMembersPopupComponent {
  private readonly _MembersService = inject(MembersService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);
  emailForm = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }

  inviteSubmission() {
    const email = this.emailForm.get('email')?.value as string;
    this._MembersService.inviteMember(email).subscribe(() => {
      this.emailForm.reset();
      this._ToastrService.success('Invitation sent successfully!', 'Success');
    });
  }
}
