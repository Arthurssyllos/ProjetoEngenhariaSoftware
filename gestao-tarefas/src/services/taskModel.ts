// src/services/taskModel.ts
export interface Task {
  id?: number; // O id pode ser opcional
  title: string;
  description: string;
  color: string;
  priority: 'alta' | 'média' | 'baixa';
  status: 'a fazer' | 'em andamento' | 'concluída'; // Defina os status válidos
}