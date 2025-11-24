// ****************************************************************
// * TASK MODEL
// * Definisce la struttura dell'oggetto Task utilizzato nell'app.
// ****************************************************************

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}