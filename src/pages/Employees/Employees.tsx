import './Employees.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchEmployees, fetchEmployeesDelete, } from '../../store/action/EmployeesAction'
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { IEmployees } from '../../models/model';
import { EditModal } from '../../components/editModal';
import { useNavigate } from 'react-router-dom';
import { AddModal } from '../../components/addModal';

export const Employees = () => {
  const { Employees,loading } = useAppSelector(state => state.Employees)
  const [editItem, setEditItem] = useState<IEmployees | undefined>()
  const [addbutton, setAddbutton] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let [page,setPage]=useState<number>(1)

  useEffect(() => {
    dispatch(fetchEmployees(page,5,setPage))
  }, [dispatch,page])
console.log(Employees);

  function backPage(){
      setPage(--page)
  }
  function nextPage(){
    setPage(++page)
  }

  async function DeleteEmployees(id: number) {
    await dispatch(fetchEmployeesDelete(id))
    navigate(0)
  }
  function profile(id:number){
    localStorage.setItem('profil',JSON.stringify(id))
    navigate('/employeesProfil')
  }
  return (<>
      {loading ? <p className='loading'>loading...</p>: 
      <div className='Employees'>
      <table className='Employees_table'>
        <thead className='Employees_thead'>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Position</th>
            <th>Edit / Delete</th>
            <th>View Profil</th>
          </tr>
        </thead>
        <tbody className='Employees_tbody'>
          {
            Employees?.map((el: IEmployees) =>
              <tr key={el?.id} >
                <td>{el?.id}</td>
                <td>{el?.name}</td>
                <td>{el?.surname}</td>
                <td>{el?.email}</td>
                <td>{el?.position}</td>
                <td>
                  <button onClick={() => setEditItem(el)}>Edit</button>
                  <button onClick={() => DeleteEmployees(el.id)} >Delete</button>
                </td>
                <td>
                  <Link to={'/employeesProfil/' + el.id} >View</Link>
                </td>
              </tr>)
          }
        </tbody>
      </table>

      <div className='buttonContainer'>
      <button onClick={()=>backPage()}>back </button>
      <button onClick={()=>nextPage()}>next </button>
      <button onClick={() => setAddbutton(true)}>Add Employees</button>

      </div>
      {editItem && <EditModal element={editItem} />}
      {addbutton && <AddModal />}
    </div>}
    </>
  )
}
