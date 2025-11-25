
// Entry point dell'applicazione Angular lato client
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Avvia l'applicazione principale con la configurazione specificata
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err)); // Log degli errori di bootstrap
