import { Component } from '@angular/core';
import { TopNavBarComponent } from "../../components/shared/top-nav-bar/top-nav-bar.component";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [TopNavBarComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}
