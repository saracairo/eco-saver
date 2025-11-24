import { Component, signal, computed, effect } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from  '../../models/task';

@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  // 1) Caricamento iniziale dal Local Storage
  private initialTasks: Task[] = (() =>  {
    // se presente, viene parse-ato;
    // se mancante, fallback lista predefinita
    const saved = localStorage.getItem('ecoSaverTasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return this.defaultTasks();
      }
    }
    return this.defaultTasks();
  })();

  // signal che contiene la lista delle task
  tasks = signal<Task[]>(this.initialTasks);

  // Lista predefinita
  private defaultTasks(): Task[] {
    return [
      {
        id: 1,
        title: 'Spegni le luci che non ti servono',
        completed: false
      },
      {
        id: 2,
        title: 'Usa meno riscaldamento',
        completed: false
      },
      {
        id: 3,
        title: 'Scollega i dispositivi non in uso',
        completed: false
      }
    ];
  }

  // 2. Salvataggio automatico con effect()
  constructor() {
    // effect osserva il signal tasks()
    // e salva su Local Storage ad ogni cambiamento;
    // funzionamento analogo a subscribe()-unsubscribe()
    effect(() => {
      const data = JSON.stringify(this.tasks());
      localStorage.setItem('ecoSaverTasks', data);
    });
  }

  completedCount = computed(() =>
    this.tasks().filter(t => t.completed).length
  );

  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

}
