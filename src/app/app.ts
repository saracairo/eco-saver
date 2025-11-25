
// Componente principale dell'applicazione
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  /**
   * Signal che contiene il titolo dell'applicazione.
   * Usato per mostrare il titolo nella UI.
   */
  protected readonly title = signal('eco-saver');
}
