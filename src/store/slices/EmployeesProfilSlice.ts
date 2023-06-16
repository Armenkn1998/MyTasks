import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEmployees, ITasks } from '../../models/model'

interface EmployeesState {
  loading: boolean;
  error: string;
  EmployeesProfil: IEmployees[]
  TasksProfil: ITasks[]
}

const initialState: EmployeesState = {
  loading: false,
  error: "",
  EmployeesProfil: [],
  TasksProfil: []
}

export const EmployeesProfilSlice = createSlice({
  name: 'EmployeesProfil',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    fetchSuccess(state, action: PayloadAction<IEmployees[]>) {
      state.loading = false;
      state.EmployeesProfil = action.payload;
      state.error = ''
    },
    fetchSuccessTasks(state, action: PayloadAction<ITasks[]>) {
      state.loading = false;
      state.TasksProfil = action.payload;
      state.error = ''
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching, fetchSuccess,fetchSuccessTasks, fetchError } = EmployeesProfilSlice.actions


export default EmployeesProfilSlice.reducer