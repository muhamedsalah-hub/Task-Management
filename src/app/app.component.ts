import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./features/Auth/pages/login/login.component";
import { SignUpComponent } from "./features/Auth/pages/sign-up/sign-up.component";
import { IconsComponent } from "./shared/icons/icons.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, SignUpComponent, IconsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TASK-MANAGEMENT';
}
