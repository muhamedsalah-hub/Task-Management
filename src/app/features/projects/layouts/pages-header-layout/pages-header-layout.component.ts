import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pages-header-layout',
  standalone: true,
  imports: [],
  templateUrl: './pages-header-layout.component.html',
  styleUrl: './pages-header-layout.component.css',
})
export class PagesHeaderLayoutComponent {
  @Input({ required: true }) fTitle: string = '';
  @Input({ required: true }) sTitle: string = '';
  @Input({ required: true }) header: string = '';
  @Input({ required: true }) button: string = '';
}
