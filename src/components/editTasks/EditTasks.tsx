import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from 'react-router-dom';
import { IEmployees, ITasks } from '../../models/model';
import { fetchFullEmployees, fetchTasksEdit } from '../../store/action/TasksAction';
import './modal.scss'

export const EditTasks = ({ element }: ITasks | any) => {

  const { EmployeesID } = useAppSelector(state => state.Tasks)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState(element?.name)
  const [employeeId, setEmployeeId] = useState<string>(element?.employeeId)
  const [description, setDescription] = useState(element?.description)
  const [startDate, setStartDate] = useState(element?.startDate)
  const [endDate, setEndDate] = useState(element?.endDate)

  useEffect(() => {
    dispatch(fetchFullEmployees())
  }, [dispatch])

  async function EditEmployees() {
    await dispatch(fetchTasksEdit(element.id, {
      id: element.id,
      name,
      employeeId,
      description,
      startDate,
      endDate
    }))
    // navigate(0)
  }

  return (
    <div className='editTasks'>
      <div className='input_boxTask'>
        <div> 
          <label>name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        </div>
   

        <div>
        <label>description</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
        <label>startDate</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        </div>
        <div>
        <label>endDate</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        </div>
        <div>
        <label>employeeId</label>
        <select name="" id="" value={employeeId}  onChange={(e)=>setEmployeeId(e.target.value)}>
                {EmployeesID?.map((el:IEmployees)=>
                    <option key={el.id} value={el.id} >{el?.id}</option>
                )}
            </select>
        </div>
     

      <button onClick={() => {EditEmployees()}}>Save</button>
      <button onClick={() => {navigate(0)}}>Cancel</button>
      </div>
    </div>
  )
}