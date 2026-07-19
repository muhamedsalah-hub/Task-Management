import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { icons } from '../data/data';
import { Iconsdata } from '../../../core/interfaces/Icons/types';
import { NgClass } from '../../../../../node_modules/@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconsComponent, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  icons: Iconsdata[] = icons;

  @Input() isDesktopCollapsed!: boolean;
  @Input() isMobileSidebarOpen!: boolean;
  @Output() toggleDesktop = new EventEmitter();
  @Output() closeMobile = new EventEmitter();

  toggleDesktopEmission() {
    this.toggleDesktop.emit();
  }
  closeMobileEmission(){
    this.closeMobile.emit();
  }

}
