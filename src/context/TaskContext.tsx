import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Task } from '../types/task';
import { loadTasksFromStorage, saveTasksToStorage } from '../storage/taskStorage';

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  addTask: (data: Omit<Task, 'id' | 'done'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  toggleTaskDone: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  deleteCompletedTasks: () => Promise<number>;
  getTaskById: (id: string) => Task | undefined;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const loaded = await loadTasksFromStorage();
      setTasks(loaded);
    } catch (e) {
      console.error('Failed to load tasks', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addTask = async (data: Omit<Task, 'id' | 'done'>) => {
    const newTask: Task = {
      ...data,
      id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 7),
      done: false,
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    await saveTasksToStorage(updated);
  };

  const updateTask = async (task: Task) => {
    const updated = tasks.map(t => (t.id === task.id ? task : t));
    setTasks(updated);
    await saveTasksToStorage(updated);
  };

  const toggleTaskDone = async (id: string) => {
    const updated = tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t));
    setTasks(updated);
    await saveTasksToStorage(updated);
  };

  const deleteTask = async (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    await saveTasksToStorage(updated);
  };

  const deleteCompletedTasks = async (): Promise<number> => {
    const completedCount = tasks.filter(t => t.done).length;
    if (completedCount === 0) return 0;

    const remaining = tasks.filter(t => !t.done);
    setTasks(remaining);
    await saveTasksToStorage(remaining);
    return completedCount;
  };

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find(t => t.id === id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        addTask,
        updateTask,
        toggleTaskDone,
        deleteTask,
        deleteCompletedTasks,
        getTaskById,
        refreshTasks: loadData,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export function useTasks(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
