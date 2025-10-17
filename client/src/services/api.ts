import axios from 'axios';
import { Task, CreateTaskData, UpdateTaskData } from '../types/Task';

// Use env var in production (e.g., Vercel). Fallbacks:
// - REACT_APP_API_BASE_URL when provided
// - '/api' so the frontend can call a same-origin backend or proxy
// - during local dev, set REACT_APP_API_BASE_URL or rely on CRA proxy
const API_BASE_URL =
  (process.env.REACT_APP_API_BASE_URL as string | undefined) || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  // Get all tasks
  getAll: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Get task by ID
  getById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  create: async (taskData: CreateTaskData): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update task
  update: async (id: string, taskData: UpdateTaskData): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete task
  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  // Toggle task completion
  toggleComplete: async (id: string, completed: boolean): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, { completed });
    return response.data;
  },
};

export default api;
