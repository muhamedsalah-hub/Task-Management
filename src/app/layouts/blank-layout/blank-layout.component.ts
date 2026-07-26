import { Component, inject } from '@angular/core';
import { BottomNavbarComponent } from '../../features/projects/shared/bottom-navbar/bottom-navbar.component';
import { SidebarComponent } from '../../features/projects/shared/sidebar/sidebar.component';
import { AuthService } from '../../core/services/auth.service';
import { IconsComponent } from '../../shared/icons/icons.component';
import { NgClass } from '../../../../node_modules/@angular/common';
import {  RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TopNavBarComponent } from '../../features/projects/shared/top-navbar/top-navbar.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [
    TopNavBarComponent,
    BottomNavbarComponent,
    SidebarComponent,
    IconsComponent,
    NgClass,
    RouterOutlet],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css',
})
export class BlankLayoutComponent {
  isDesktopCollapsed: boolean = true;
  isMobileSidebarOpen: boolean = false;

  private readonly _AuthService = inject(AuthService);
  private readonly _Toastr = inject(ToastrService);

  toggleDesktopSidebar() {
    this.isDesktopCollapsed = !this.isDesktopCollapsed;
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }

  logOut() {
    this._AuthService.logout();
    this._Toastr.success('User logged out successfully');
  }
}
