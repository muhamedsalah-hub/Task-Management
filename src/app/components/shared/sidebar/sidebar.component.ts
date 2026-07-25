import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Iconsdata } from '../../../core/interfaces/Icons/types';
import { NgClass } from '../../../../../node_modules/@angular/common';
import { ProjectContextService } from '../../../core/services/project-context.service';
import { icons } from '../../../core/data/data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly _ProjectContextService = inject(ProjectContextService);
  icons: Iconsdata[] = icons;

  @Input() isDesktopCollapsed!: boolean;
  @Input() isMobileSidebarOpen!: boolean;
  @Output() toggleDesktop = new EventEmitter();
  @Output() closeMobile = new EventEmitter();
  @Output() logoutClicked = new EventEmitter();

  toggleDesktopEmission() {
    this.toggleDesktop.emit();
  }
  closeMobileEmission() {
    this.closeMobile.emit();
  }
  logoutSubmission() {
    this.logoutClicked.emit();
  }

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
