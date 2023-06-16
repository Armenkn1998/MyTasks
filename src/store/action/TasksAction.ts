import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { fetching, fetchSuccess, fetchError,fetchSuccessEmployeesId,fetchSuccessSearchTasks } from "../slices/TasksSlice";
import { ITasks } from "../../models/model";



export const fetchTasks = (page:number,limit:number,setPage:any) => {
    return async (dispatch: Dispatch) => {
        try {

            dispatch(fetching());
            const response = await axios.get(`https://rocky-temple-83495.herokuapp.com/tasks?_page=${page}&_limit=${limit}`);
            console.log(response.data);
            
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
export const fetchTasksDelete = (id:number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            await axios.delete(`https://rocky-temple-83495.herokuapp.com/tasks/${id}`);
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchTasksEdit = (id:number,newTasks:ITasks) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            await axios.put(`https://rocky-temple-83495.herokuapp.com/tasks/${id}`,newTasks);
            
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchTasksAdd = (newTasks:any) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            await axios.post('https://rocky-temple-83495.herokuapp.com/tasks',newTasks);
            
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchFullEmployees = () => {
    return async (dispatch: Dispatch) => {
        try {

            dispatch(fetching());
            const response = await axios.get('https://rocky-temple-83495.herokuapp.com/employees');
            dispatch(fetchSuccessEmployeesId(response.data));
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}

export const fetchSearchTasks = (searchItem:string,search:string) => {
    return async (dispatch: Dispatch) => {
        try {

            dispatch(fetching());
            const response = await axios.get(`https://rocky-temple-83495.herokuapp.com/tasks?${searchItem}=${search}`);
            dispatch(fetchSuccessSearchTasks(response.data));
            
            
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}