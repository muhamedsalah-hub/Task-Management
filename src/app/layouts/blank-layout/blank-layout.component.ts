import { Component, inject } from '@angular/core';
import { TopNavBarComponent } from '../../components/shared/top-navbar/top-navbar.component';
import { BottomNavbarComponent } from '../../components/shared/bottom-navbar/bottom-navbar.component';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';
import { AuthService } from '../../core/services/auth.service';
import { IconsComponent } from '../../components/shared/icons/icons.component';
import { NgClass } from '../../../../node_modules/@angular/common';
import { Router, RouterOutlet } from '../../../../node_modules/@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [
    TopNavBarComponent,
    BottomNavbarComponent,
    SidebarComponent,
    IconsComponent,
    NgClass,
    RouterOutlet,
  ],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css',
})
export class BlankLayoutComponent {
  isDesktopCollapsed: boolean = true;
  isMobileSidebarOpen: boolean = false;

  private readonly _AuthService = inject(AuthService);
  private readonly _Toastr = inject(ToastrService);
  private readonly _Router = inject(Router);

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
    this._Router.navigate(['/login']);
    this._Toastr.success('User logged out successfully');
  }
}
