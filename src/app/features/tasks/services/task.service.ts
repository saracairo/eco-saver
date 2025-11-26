/**
 * ==================================================================================
 * TASK SERVICE
 * Service per la gestione centralizzata delle task.
 * 
 * Responsabilità:
 *    - gestire la lista delle task;
 *    - fornire metodi per aggiungere, modificare, recuperare task;
 *    - gestire la persistenza su localStorage.
 * ==================================================================================
 */

import { Injectable, signal, computed, effect } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /** Signal che contiene la lista delle task correnti. */
  private readonly _tasks = signal<Task[]>(this.loadInitialTasks());

  /** Computed che calcola il numero di task completate. */
  readonly completedCount = computed(() =>
    this._tasks().filter(t => t.completed).length
  );

  /** Signal pubblico per accedere alle task */
  readonly tasks$ = computed(() => this._tasks());

  constructor() {
    // Effect: salva automaticamente le task su Local Storage ad ogni modifica
    effect(() => {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('ecoSaverTasks', JSON.stringify(this._tasks()));
      }
    });
  }

  /** Restituisce la lista delle task correnti */
  getTasks(): Task[] {
    return this._tasks();
  }

  /** Restituisce il conteggio delle task completate */
  getCompletedCount(): number {
    return this.completedCount();
  }

  /** Aggiunge una nuova task alla lista */
  addTask(task: { title: string; description: string }) {
    const newTask: Task = {
      id: Date.now(),
      title: task.title,
      completed: false
    };
    this._tasks.update(tasks => [...tasks, newTask]);
  }


  /** Cambia lo stato di completamento di una task dato il suo id */
  toggleTask(id: number) {
    this._tasks.update(tasks =>
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  /** Carica le task iniziali da Local Storage o usa quelle di default */
  private loadInitialTasks(): Task[] {
    // se siamo sul browser e localStorage è disponibile
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // salviamo in variabile gli oggetti in essa contenuti
      const saved = localStorage.getItem('ecoSaverTasks');
      // se esistono, li parsifichiamo e restituiamo
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // altrimenti restituiamo task di default
          return this.defaultTasks();
        }
      }
    }
    return this.defaultTasks();
  }

  private defaultTasks(): Task[] {
    return [
      { id: 1, title: 'Spegnere luci se inutilizzate', completed: false },
      { id: 2, title: 'Abbassare riscaldamento', completed: false },
      { id: 3, title: 'Scollegare i dispositivi non in uso', completed: false },
    ];
  }
}