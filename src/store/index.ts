import { configureStore } from '@reduxjs/toolkit';

import EmployeesReduces from './slices/EmployeesSlice';
import TasksReduces from './slices/TasksSlice';
import EmployeesProfilReduces from './slices/EmployeesProfilSlice';


export const store = configureStore({
  reducer: {
    Employees:EmployeesReduces,
    Tasks:TasksReduces,
    EmployeesProfil:EmployeesProfilReduces
    


  }})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


