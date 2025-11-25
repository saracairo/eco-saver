// Importazione moduli Angular e componenti necessari

import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from  '../../models/task';


@Component({
  selector: 'app-task-list',
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  /**
   * Caricamento iniziale delle task dal Local Storage.
   * Se esistono task salvate, vengono parse-ate, altrimenti si usa la lista predefinita.
   */
  private initialTasks: Task[] = (() =>  {
    // Verifica se siamo in ambiente browser
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('ecoSaverTasks');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return this.defaultTasks();
        }
      }
    }
    // Se non siamo in browser o non ci sono task salvate, usa la lista predefinita
    return this.defaultTasks();
  })();

  /**
   * Signal che contiene la lista delle task correnti.
   * Aggiornando questo signal, si aggiorna la UI e si attiva l'effect di salvataggio.
   */
  tasks = signal<Task[]>(this.initialTasks);

  /**
   * Restituisce una lista di task predefinite.
   * @returns Array di Task
   */
  private defaultTasks(): Task[] {
    return [
      {
        id: 1,
        title: 'Spegnere luci se inutilizzate',
        completed: false
      },
      {
        id: 2,
        title: 'Abbassare riscaldamento',
        completed: false
      },
      {
        id: 3,
        title: 'Scollegare i dispositivi non in uso',
        completed: false
      }
    ];
  }

  /**
   * Costruttore: imposta un effect che salva automaticamente le task su Local Storage
   * ogni volta che la lista viene modificata.
   */
  constructor() {
    effect(() => {
      // Salva su Local Storage solo se disponibile
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const data = JSON.stringify(this.tasks());
        localStorage.setItem('ecoSaverTasks', data);
      }
    });
  }

  /**
   * Computed che calcola il numero di task completate.
   * Viene aggiornato automaticamente quando cambia la lista delle task.
   */
  completedCount = computed(() =>
    this.tasks().filter(t => t.completed).length
  );

  /**
   * Cambia lo stato di completamento di una task dato il suo id.
   * @param id Identificativo della task da modificare
   */
  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

}
