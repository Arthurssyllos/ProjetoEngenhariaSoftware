// src/services/taskService.ts
import { Task } from './taskModel';

const tasks: Task[] = [];
let currentId = 1; // Variável para rastrear o próximo ID

export const initDB = async () => {
  // Inicializa seu banco de dados aqui, se necessário
};

export const getTasks = async (): Promise<Task[]> => {
  return tasks;
};

export const getTask = async (id: number): Promise<Task | undefined> => {
  return tasks.find(task => task.id === id);
};

export const addTask = async (task: Task): Promise<void> => {
  task.id = currentId++; // Usa a variável currentId para gerar um ID único
  tasks.push(task);
};

export const updateTask = async (id: number, updatedTask: Task): Promise<void> => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
  } else {
    throw new Error(`Task with ID ${id} not found.`);
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
  } else {
    throw new Error(`Task with ID ${id} not found.`);
  }
};

// Nova função para alternar a conclusão da tarefa
export const toggleTaskCompletion = async (id: number): Promise<void> => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    const task = tasks[index];
    task.status = task.status === 'concluída' ? 'a fazer' : 'concluída'; // Alterna o status da tarefa
  } else {
    throw new Error(`Task with ID ${id} not found.`);
  }
};
