import { Component } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { icons } from '../data/data';
import { Iconsdata } from '../../../core/interfaces/Icons/types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconsComponent, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  icons: Iconsdata[] = icons;
  isCollapsed: boolean = true;

  handleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
