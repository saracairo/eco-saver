/**
 * ==================================================================================
 * ADD TASK MODAL COMPONENT
 * Componente per l'aggiunta di nuove task tramite una finestra modale.
 * 
 * Responsabilità:
 *    - inserimento nuova task alla lista.
 * 
 * Funzionamento:
 *    - riceve come input una proprietà 'open' dal padre per gestire la visibilità;
 *    - costruire form di inserimento titolo e testo nuova task;
 *    - al submit, emissione evento 'taskAdded' con la nuova task come valore;
 *    - btn 'annulla' emette l’evento 'close' per chiudere senza salvare.
 * ==================================================================================
 */

// importazione moduli Angular necessari
import { Component, EventEmitter, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent {
  // ==============================================
  //  SIGNALS PROPERTIES AND EVENTS
  // ==============================================
  
  // input - valore passato dal componente padre
  open = input<boolean>(false);

  // output - ememtte eventi verso il componente padre
  taskAdded = output<{ title: string; description: string }>();
  close = output<void>();
  
  // local dai form field
  taskTitle = signal('');
  taskDescription = signal('');

  // ==============================================
  //  METHODS
  // ==============================================
  addTask() {
    if (this.taskTitle().trim()) {
      // emissione evento di aggiunta task: oggetto con i dati inseriti nel form
      this.taskAdded.emit({
        title: this.taskTitle(),
        description: this.taskDescription()
      });
      this.closeModal();
    }
  }
  
  closeModal() {
    // emissione evento di chiusura
    this.close.emit();
    // reset campi form
    this.taskTitle.set('');
    this.taskDescription.set('');
  }
}
