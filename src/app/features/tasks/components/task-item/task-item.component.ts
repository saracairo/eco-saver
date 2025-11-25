
// Componente che rappresenta una singola task nella lista
import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  /**
   * Input: task da visualizzare e gestire
   */
  task = input<Task>();

  /**
   * Output: evento per notificare il toggle dello stato della task
   */
  toggle = output<void>();
}
