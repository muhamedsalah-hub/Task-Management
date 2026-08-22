import { Injectable, signal } from '@angular/core';

@Injectable()
export class TaskDetailsModalService {
  isOpen = signal<boolean>(true);

  closeModal() {
    this.isOpen.set(false);
  }
  openModal() {
    this.isOpen.set(true);
  }
  
}
