import { Component} from '@angular/core';
import { TopNavBarComponent } from '../../components/shared/top-navbar/top-navbar.component';
import { BottomNavbarComponent } from '../../components/shared/bottom-navbar/bottom-navbar.component';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [TopNavBarComponent, BottomNavbarComponent, SidebarComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css',
})
export class BlankLayoutComponent {
  isDesktopCollapsed: boolean = true;
  isMobileSidebarOpen: boolean = false;

  toggleDesktopSidebar() {
    this.isDesktopCollapsed = !this.isDesktopCollapsed;
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

 closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }

}
