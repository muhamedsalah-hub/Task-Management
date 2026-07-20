import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { icons } from '../data/data';
import { Iconsdata } from '../../../core/interfaces/Icons/types';
import { NgClass } from '../../../../../node_modules/@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  icons: Iconsdata[] = icons;

  @Input() isDesktopCollapsed!: boolean;
  @Input() isMobileSidebarOpen!: boolean;
  @Output() toggleDesktop = new EventEmitter();
  @Output() closeMobile = new EventEmitter();
  @Output() logoutClicked = new EventEmitter();

  toggleDesktopEmission() {
    this.toggleDesktop.emit();
  }
  closeMobileEmission(){
    this.closeMobile.emit();
  }
  logoutSubmission(){
     this.logoutClicked.emit();
  }

}
