import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-form-layout',
  standalone: true,
  imports: [],
  templateUrl: './project-form-layout.component.html',
  styleUrl: './project-form-layout.component.css',
})
export class ProjectFormLayoutComponent {
  @Input({ required: true }) fTitle: string = '';
  @Input({ required: true }) sTitle: string = '';
  @Input({ required: true }) header: string = '';
  @Input({ required: true }) formHeader: string = '';
}
