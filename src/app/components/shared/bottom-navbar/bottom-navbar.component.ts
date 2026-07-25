import { Component, inject } from '@angular/core';
import { Iconsdata } from '../../../core/interfaces/Icons/types';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { icons } from '../../../core/data/data';
import { ProjectContextService } from '../../../core/services/project-context.service';

@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.css',
})
export class BottomNavbarComponent {
  icons: Iconsdata[] = icons;
  private readonly _ProjectContextService = inject(ProjectContextService);

  getLink(link?: string) {
    if (link === 'projects') {
      return ['/Projects'];
    }

    if (this._ProjectContextService.projectId()) {
      return ['/projects', this._ProjectContextService.projectId(), link];
    }

    return null;
  }
}
