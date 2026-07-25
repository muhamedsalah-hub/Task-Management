import { Component } from '@angular/core';
import { IconsComponent } from "../../shared/icons/icons.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-empty-projects',
  standalone: true,
  imports: [IconsComponent, RouterLink],
  templateUrl: './empty-projects.component.html',
  styleUrl: './empty-projects.component.css'
})
export class EmptyProjectsComponent {

}
