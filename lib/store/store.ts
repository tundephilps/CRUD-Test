import { createStore, combineReducers } from 'redux';
import tasksReducer from './tasksSlice';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;