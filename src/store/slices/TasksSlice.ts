import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEmployees, ITasks } from '../../models/model'

interface TasksState {
  loading: boolean;
  error: string;
  Tasks: ITasks[];
  EmployeesID: IEmployees[];
  SearchTasks:ITasks[];

}

const initialState: TasksState = {
  loading: false,
  error: "",
  Tasks: [],
  EmployeesID: [],
  SearchTasks:[]
}

export const TasksSlice = createSlice({
  name: 'Tasks',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    fetchSuccess(state, action: PayloadAction<ITasks[]>) {
      state.loading = false;
      state.Tasks = action.payload;
      state.error = ''
    },
    fetchSuccessEmployeesId(state, action: PayloadAction<IEmployees[]>) {
      state.loading = false;
      state.EmployeesID = action.payload;
      state.error = ''
    },
    fetchSuccessSearchTasks(state, action: PayloadAction<ITasks[]>) {
      state.loading = false;
      state.SearchTasks = action.payload;
      state.error = ''
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching, fetchSuccess, fetchError,fetchSuccessEmployeesId,fetchSuccessSearchTasks } = TasksSlice.actions


export default TasksSlice.reducer