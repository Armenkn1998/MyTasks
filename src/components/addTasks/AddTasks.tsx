import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchFullEmployees, fetchTasksAdd,fetchTasks } from '../../store/action/TasksAction'
import { IEmployees } from '../../models/model'
import './AddTasks.scss'

export const AddTasks = ({setAddbutton,page,limit,setPage}:any) => {
    const { EmployeesID } = useAppSelector(state => state.Tasks)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState<string>('')
    const [employeeId, setEmployeeId] = useState<string>()
    const [description, setDescription] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')



    useEffect(() => {
        dispatch(fetchFullEmployees())
    }, [dispatch])

    async function AddEmployees(e:any) {
        e.preventDefault()
        const newTasks: any = {
            name,
            employeeId,
            description,
            startDate,
            endDate
        }
        await dispatch(fetchTasksAdd(newTasks))
        await dispatch(fetchTasks(page,limit,setPage))
        setAddbutton("")

    }

    return (
        <div className='addTasks'>
            <form className='addFormTasks'>
                <div>
                    <label>Name:</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                </div>
                <div>
                    <label>Description:</label><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

                </div>
                <div>
                    <label>StartDate:</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                </div>
                <div>
                    <label>EndDate:</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                </div>
                <div>
                    <label>Employees:</label> <select name="" id="" onChange={(e) => setEmployeeId(e.target.value)}>

                 <option value="" selected disabled hidden>Choose here</option>
              
                        {EmployeesID?.map((el: IEmployees) =>
                            <option key={el.id} value={el.id} >{el?.name } {el?.surname}</option>
                        )}
                    </select>
                    </div>


                    <button onClick={(e) => { AddEmployees(e) }}>Save To Add</button>
            <button onClick={() => setAddbutton("")}>Cancel</button>
            </form>
        </div>
    )
}
