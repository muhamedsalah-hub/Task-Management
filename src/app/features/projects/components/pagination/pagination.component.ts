import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  isMobile: WritableSignal<boolean> = signal(false);
  readonly _PLATFORM_ID = inject(PLATFORM_ID);

  @Input({ required: true }) currentPage!: number;
  @Input({ required: true }) lastPage!: number;
  @Input({ required: true }) numOfItemsPerPage!: number;
  @Input({ required: true }) total!: number;

  @Output() nextButton: EventEmitter<void> = new EventEmitter();
  @Output() prevButton: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const mediaQuery = window.matchMedia('(max-width: 767px)');
      this.isMobile.set(mediaQuery.matches);
      mediaQuery.addEventListener('change', (event) => {
        this.isMobile.set(event.matches);
      });
    }
  }

  nextButtonPage() {
    if (this.currentPage !== this.lastPage) {
      this.nextButton.emit();
      if (this.isMobile()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  prevButtonPage() {
    if (this.currentPage !== 1) {
      this.prevButton.emit();
      if (this.isMobile()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  visiblePages(): number[] {
    const start = Math.min(this.currentPage, this.lastPage - 1);
    const end = Math.min(this.lastPage, start + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
