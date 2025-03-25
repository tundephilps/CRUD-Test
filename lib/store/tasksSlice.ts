import { Action } from 'redux';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
}

// Action Types
export const ADD_TASK = 'tasks/addTask';
export const UPDATE_TASK = 'tasks/updateTask';
export const DELETE_TASK = 'tasks/deleteTask';
export const TOGGLE_TASK_COMPLETE = 'tasks/toggleTaskComplete';

// Action Interfaces
interface AddTaskAction extends Action {
  type: typeof ADD_TASK;
  payload: Task;
}

interface UpdateTaskAction extends Action {
  type: typeof UPDATE_TASK;
  payload: Task;
}

interface DeleteTaskAction extends Action {
  type: typeof DELETE_TASK;
  payload: string;
}

interface ToggleTaskCompleteAction extends Action {
  type: typeof TOGGLE_TASK_COMPLETE;
  payload: string;
}

export type TaskActionTypes = 
  | AddTaskAction 
  | UpdateTaskAction 
  | DeleteTaskAction 
  | ToggleTaskCompleteAction;

// Action Creators
export const addTask = (task: Task): AddTaskAction => ({
  type: ADD_TASK,
  payload: task,
});

export const updateTask = (task: Task): UpdateTaskAction => ({
  type: UPDATE_TASK,
  payload: task,
});

export const deleteTask = (id: string): DeleteTaskAction => ({
  type: DELETE_TASK,
  payload: id,
});

export const toggleTaskComplete = (id: string): ToggleTaskCompleteAction => ({
  type: TOGGLE_TASK_COMPLETE,
  payload: id,
});

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

// Reducer
const tasksReducer = (
  state = initialState,
  action: TaskActionTypes
): TasksState => {
  let newState: TasksState;

  switch (action.type) {
    case ADD_TASK:
      newState = {
        tasks: [...state.tasks, action.payload],
      };
      break;

    case UPDATE_TASK:
      newState = {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
      break;

    case DELETE_TASK:
      newState = {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
      break;

    case TOGGLE_TASK_COMPLETE:
      newState = {
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
      break;

    default:
      return state;
  }

  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('tasks', JSON.stringify(newState));
  }

  return newState;
};

export default tasksReducer;