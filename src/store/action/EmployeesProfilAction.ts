import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { fetching, fetchSuccess,fetchSuccessTasks, fetchError } from "../slices/EmployeesProfilSlice";




export const fetchEmployeesProfil = (id:string) => {
    return async (dispatch: Dispatch) => {
        try {
     
            dispatch(fetching());
            const response = await axios.get(`https://rocky-temple-83495.herokuapp.com/employees/${id}`);
            const response1 = await axios.get(`https://rocky-temple-83495.herokuapp.com/tasks?employeeId=${id}`);
            dispatch(fetchSuccess([response.data]));
            dispatch(fetchSuccessTasks(response1.data))
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
