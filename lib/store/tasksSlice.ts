import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
}

// Load initial state from localStorage if available
const loadState = (): TasksState => {
  if (typeof window === 'undefined') {
    return { tasks: [] };
  }
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return { tasks: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { tasks: [] };
  }
};

const initialState: TasksState = loadState();

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(state));
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('tasks', JSON.stringify(state));
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(state));
      }
    },
    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('tasks', JSON.stringify(state));
        }
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleTaskComplete } = tasksSlice.actions;
export default tasksSlice.reducer;