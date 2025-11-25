// ****************************************************************
// * TASK MODEL
// * Definisce la struttura dell'oggetto Task utilizzato nell'app.
// ****************************************************************


/**
 * Interfaccia che rappresenta una task.
 * @property id Identificativo univoco della task
 * @property title Descrizione della task
 * @property completed Stato di completamento della task
 */
export interface Task {
  id: number;         // Identificativo univoco
  title: string;      // Descrizione della task
  completed: boolean; // True se la task è completata
}