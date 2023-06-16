import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEmployees } from '../../models/model'

interface EmployeesState {
  loading: boolean;
  error: string;
  Employees: IEmployees[]
}

const initialState: EmployeesState = {
  loading: false,
  error: "",
  Employees: []
}

export const EmployeesSlice = createSlice({
  name: 'Employees',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    fetchSuccess(state, action: PayloadAction<IEmployees[]>) {
      state.loading = false;
      state.Employees = action.payload;
      state.error = ''
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching, fetchSuccess, fetchError } = EmployeesSlice.actions


export default EmployeesSlice.reducer