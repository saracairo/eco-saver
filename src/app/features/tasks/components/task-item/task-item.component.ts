/**
 * ==================================================================================
 * TASK ITEM COMPONENT
 * Componente che rappresenta una singola task nella lista
 * 
 * Responsabilità:
 *    - visualizzare singola task;
 *    - marcare task come completata/da completare.
 * 
 * Funzionamento:
 *    - riceve la singola task come input;
 *    - mostra il titolo e lo stato (completata/non completata);
 *    - al click su checkbox, emette l’evento toggle con l’id della task,
 *      che viene gestito dal padre per aggiornarne lo stato.
 * ==================================================================================
 */

import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  /** Input: task da visualizzare e gestire */
  task = input<Task>();

  /** Output: evento per notificare il toggle dello stato della task */
  toggle = output<void>();
}
