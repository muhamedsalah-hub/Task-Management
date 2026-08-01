import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { IProjectEpics } from '../../../../../core/interfaces/Projects/types';
import { TrimTextPipe } from '../../../../../core/pipes/trim-text.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-epic-details-popup',
  standalone: true,
  imports: [TrimTextPipe,DatePipe],
  templateUrl: './epic-details-popup.component.html',
  styleUrl: './epic-details-popup.component.css',
})
export class EpicDetailsPopupComponent {
  @Input({ required: true }) EpicDetails!: IProjectEpics | null;

  @Output() closePopUpEmitter = new EventEmitter<void>();
  @Output() openPopUpEmitter = new EventEmitter<void>();

  closePopUp() {
    this.closePopUpEmitter.emit();
  }

  openPopUp() {
    this.openPopUpEmitter.emit();
  }
}
