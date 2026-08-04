import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProjectContextService } from '../../../../core/services/project-context.service';

@Component({
  selector: 'app-project-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './project-layout.component.html',
  styleUrl: './project-layout.component.css',
})
export class ProjectLayoutComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProjectContextService = inject(ProjectContextService);

  constructor() {
    this._ActivatedRoute.paramMap.subscribe((param) => {
      this._ProjectContextService.projectId.set(param.get('projectId'));
    });
  }
}
