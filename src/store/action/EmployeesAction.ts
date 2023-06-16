import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { fetching, fetchSuccess, fetchError } from "../slices/EmployeesSlice";
import { IEmployees } from "../../models/model";



export const fetchEmployees = (page:number,limit:number,setPage:any) => {
    return async (dispatch: Dispatch) => {
        try {

            dispatch(fetching());
            const response = await axios.get(`https://rocky-temple-83495.herokuapp.com/employees?_page=${page}&_limit=${limit}`);
            
            if(response.data.length<=0||page <=1){
                setPage(1)
            }
            dispatch(fetchSuccess(response.data));
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchEmployeesDelete = (id:number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            await axios.delete(`https://rocky-temple-83495.herokuapp.com/employees/${id}`);
            // fetchEmployees()
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchEmployeesEdit = (id:number,newEmployees:IEmployees) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            const response=await axios.put(`https://rocky-temple-83495.herokuapp.com/employees/${id}`,newEmployees);
            console.log(response);
            // fetchEmployees()
            
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchEmployeesAdd = (newEmployees:any) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            const response=await axios.post('https://rocky-temple-83495.herokuapp.com/employees',newEmployees);
            console.log(response);
            // fetchEmployees()
            
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}