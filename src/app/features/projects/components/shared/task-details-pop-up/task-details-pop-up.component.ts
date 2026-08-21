import { Component, inject } from '@angular/core';
import { TaskDetailsModalService } from '../services/task-details-modal.service';

@Component({
  selector: 'app-task-details-pop-up',
  standalone: true,
  imports: [],
  providers:[TaskDetailsModalService],
  templateUrl: './task-details-pop-up.component.html',
  styleUrl: './task-details-pop-up.component.css'
})
export class TaskDetailsPopUpComponent {
  
  readonly _TaskDetailsModalService=inject(TaskDetailsModalService);

}
