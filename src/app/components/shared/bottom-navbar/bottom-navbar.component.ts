import { Component } from '@angular/core';
import { Iconsdata } from '../../../core/interfaces/Icons/types';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { icons } from '../data/data';

@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.css',
})
export class BottomNavbarComponent {
  icons: Iconsdata[] = icons;
}
