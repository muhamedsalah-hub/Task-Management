import {
  inject,
  Injectable,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProjectContextService {
  projectId: WritableSignal<string | null> = signal(null);

  private readonly _ActivatedRoute = inject(ActivatedRoute);

}
