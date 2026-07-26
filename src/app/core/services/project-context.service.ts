import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectContextService {
  projectId: WritableSignal<string | null> = signal(null);
}
