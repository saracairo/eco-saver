/**
 * ==================================================================================
 * TASK LIST COMPONENT
 * Componente per la gestione e visualizzazione della lista delle task.
 * 
 * Responsabilità:
 *    - visualizzare lista delle task;
 *    - mostrare conteggio delle task completate (completedCount())
 *      e aggiornarlo in tempo reale;
 *    - chiamare modal di inserimento task;
 *    - gestire stato task (completate/da completare).
 * 
 * Funzionamento:
 *    - direttiva @for per mostrare dinamicamente la lista task;
 *    - signals per gestione stato task;
 *    - btn 'add task' apre modal ed emette signal di apertura;
 *    - direttiva @if per mostrare componente modal in risposta al signal;
 *    - property [open] passata al modal per gestire eventi 'taskAdded' e 'close';
 *    - recupero informazioni nuova task dalla chiusura del modal per salvataggio
 *      automatico su local storage.
 * 
 * Flusso aggiunta task:
 *    1) L’utente clicca “Aggiungi Task”.
 *    2) showAddModal viene impostato a true e il modal appare.
 *    3) L’utente compila il form e invia.
 *    4) Il modal emette taskAdded, il padre aggiorna il signal tasks e chiude il modal.
 *    5) La lista si aggiorna in tempo reale.
 * ==================================================================================
 */

// importazione moduli Angular e componenti necessari
import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { Task } from  '../../models/task';
import { TaskService } from '../../services/task.service';

// definizione del componente
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, AddTaskModalComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  // =======================
  // Signals & Properties
  // =======================

  /** Signal che contiene la lista delle task correnti. */
  // tasks = signal<Task[]>(this.loadInitialTasks()); // è ora sul service
  tasks = this.taskService.tasks$;

  /** Signal per gestire l'apertura del modal di aggiunta task. */
  showAddModal = signal(false);

  /** Computed che calcola il numero di task completate. */
  completedCount = computed(() =>
    this.tasks().filter(t => t.completed).length
  );

  // =======================
  // Costruttore & Effects
  // =======================

  constructor() {
    // Effect: salva automaticamente le task su Local Storage ad ogni modifica
    effect(() => {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('ecoSaverTasks', JSON.stringify(this.tasks()));
      }
    });
  }

  // =======================
  // Metodi pubblici
  // =======================

  /** Apre il modal per aggiungere una nuova task */
  openAddModal() {
    this.showAddModal.set(true);
  }

  /** Chiude il modal */
  closeAddModal() {
    this.showAddModal.set(false);
  }

  /** Aggiunge una nuova task alla lista */
  addTask(task: { title: string; description: string }) {
    const newTask: Task = {
      id: Date.now(),
      title: task.title,
      completed: false
    };
    this.tasks.update(tasks => [...tasks, newTask]);
    this.closeAddModal();
  }

  /** Cambia lo stato di completamento di una task dato il suo id */
  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  // =======================
  // Metodi privati
  // =======================

  /** Carica le task iniziali da Local Storage o usa quelle di default */
  private loadInitialTasks(): Task[] {
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
    return this.defaultTasks();
  }

  /** Restituisce una lista di task predefinite */
  private defaultTasks(): Task[] {
    return [
      { id: 1, title: 'Spegnere luci se inutilizzate', completed: false },
      { id: 2, title: 'Abbassare riscaldamento', completed: false },
      { id: 3, title: 'Scollegare i dispositivi non in uso', completed: false }
    ];
  }
}
