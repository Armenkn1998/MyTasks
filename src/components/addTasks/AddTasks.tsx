import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchFullEmployees, fetchTasksAdd } from '../../store/action/TasksAction'
import { IEmployees } from '../../models/model'
import './AddTasks.scss'

export const AddTasks = () => {
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

    async function AddEmployees() {
        const newTasks: any = {
            name,
            employeeId,
            description,
            startDate,
            endDate
        }
        await dispatch(fetchTasksAdd(newTasks))
        // navigate(0)
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
                    <label>EmployeesID:</label> <select name="" id="" onChange={(e) => setEmployeeId(e.target.value)}>


                        {EmployeesID?.map((el: IEmployees) =>
                            <option key={el.id} value={el.id} >{el?.id}</option>
                        )}
                    </select>
                    </div>


                    <button onClick={() => { AddEmployees() }}>Save To Add</button>
            <button onClick={() => navigate(0)}>Cancel</button>
            </form>
        </div>
    )
}
