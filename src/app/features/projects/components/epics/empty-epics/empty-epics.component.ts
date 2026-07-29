import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-empty-epics',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empty-epics.component.html',
  styleUrl: './empty-epics.component.css'
})
export class EmptyEpicsComponent {

}
