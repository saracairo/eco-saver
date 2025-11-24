import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  task = input<Task>();
  toggle = output<void>();
}
