import './Tasks.scss'
import { useEffect, useState } from 'react'
import { fetchTasks, fetchTasksDelete,fetchSearchTasks } from '../../store/action/TasksAction'
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { ITasks } from '../../models/model';
import { useNavigate } from 'react-router-dom';
import { AddTasks } from '../../components/addTasks';
import { EditTasks } from '../../components/editTasks';

export const Tasks = () => {

  const { Tasks } = useAppSelector(state => state.Tasks)
  const { SearchTasks } = useAppSelector(state => state.Tasks)
  const [editItem, setEditItem] = useState<ITasks | undefined>()
  const [addbutton, setAddbutton] = useState<boolean>(false)
  const [search,setSearch] = useState<string>('')
  const [searchItem,setSearchItem] = useState<string>('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let [page,setPage]=useState<number>(1)

  useEffect(() => {
    dispatch(fetchTasks(page,5,setPage))
  }, [dispatch,page])
console.log(page);

  function backPage(){
      setPage(--page)
  }
  function nextPage(){
    setPage(++page)
  }

  async function DeleteTasks(id: number) {
    await dispatch(fetchTasksDelete(id))
    // navigate(0)
  }

  function searchTasks(){
dispatch(fetchSearchTasks(searchItem,search))
  }
  console.log(Tasks);
  
  return (<>
  
    <div className='Tasks'>
      <div className='searchTasks'>
        <span>Search in:</span> <select name="" id="" onChange={(e)=>(setSearchItem(e.target.value))}>
        <option value="" selected disabled hidden>Choose here</option>
          <option value="name_like">Name</option>
          <option value="description_like">Description</option>
          <option value="startDate">StartDate</option>
          <option value="endDate">EndDate</option>
        </select>
      <input type="search" onChange={(e)=>{setSearch(e.target.value)}} />
      <button onClick={()=>{searchTasks()}}>Search</button>
      {SearchTasks && <button onClick={()=>{navigate(0)}}>See All</button> }
      
      </div>
      <table className='Tasks_table'>
        <thead className='Tasks_thead'>
          <tr>
            <th>Id</th>
            <th>EmployeeId</th>
            <th>Name</th>
            <th>Description</th>
            <th>StartDate</th>
            <th>EndDate</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody className='Tasks_tbody'>
          {
           SearchTasks.length > 0 ? SearchTasks?.map((el: ITasks) =>
              <tr key={el?.id}>
                <td>{el?.id}</td>
                <td>{el?.employeeId}</td>
                <td>{el?.name}</td>
                <td>{el?.description}</td>
                <td>{el?.startDate}</td>
                <td>{el?.endDate}</td>
                <td>
                  <button onClick={() => setEditItem(el)}>Edit</button>
                  <button onClick={() => DeleteTasks(el.id)} >Delete</button>
                </td>
              </tr>):Tasks?.map((el: ITasks) =>
              <tr key={el?.id}>
                <td>{el?.id}</td>
                <td>{el?.employeeId}</td>
                <td>{el?.name}</td>
                <td>{el?.description}</td>
                <td>{el?.startDate}</td>
                <td>{el?.endDate}</td>
                <td>
                  <button onClick={() => setEditItem(el)}>Edit</button>
                  <button onClick={() => DeleteTasks(el.id)} >Delete</button>
                </td>
              </tr>)
          }
        </tbody>
      </table>
      <div className="buttonContanier">
      <button onClick={()=>{backPage()}}>back </button>
      <button onClick={()=>{nextPage()}}>next </button>
      <button onClick={() => {setAddbutton(true)}}>Add Tasks</button>
      </div>
      {editItem && <EditTasks element={editItem} />}
      {addbutton && <AddTasks />}
    </div>

</>
  )
}
