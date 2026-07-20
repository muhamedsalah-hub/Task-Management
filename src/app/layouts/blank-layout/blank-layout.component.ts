import { Component, inject} from '@angular/core';
import { TopNavBarComponent } from '../../components/shared/top-navbar/top-navbar.component';
import { BottomNavbarComponent } from '../../components/shared/bottom-navbar/bottom-navbar.component';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';
import { AuthService } from '../../core/services/auth.service';
import { IconsComponent } from "../../components/shared/icons/icons.component";
import { AddProjectFormComponent } from "../../components/projects/add-project-form/add-project-form.component";
import { NgClass } from "../../../../node_modules/@angular/common";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [TopNavBarComponent, BottomNavbarComponent, SidebarComponent, IconsComponent, AddProjectFormComponent, NgClass],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css',
})
export class BlankLayoutComponent {
  isDesktopCollapsed: boolean = true;
  isMobileSidebarOpen: boolean = false;

  private readonly _AuthService=inject(AuthService);

  toggleDesktopSidebar() {
    this.isDesktopCollapsed = !this.isDesktopCollapsed;
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

 closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }

  logOut(){
    this._AuthService.logout();
  }

}
