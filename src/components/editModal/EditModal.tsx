import { useState } from 'react'
import { IEmployees } from '../../models/model'
import { fetchEmployeesEdit } from '../../store/action/EmployeesAction'
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from 'react-router-dom';
import './modal.scss'

export const EditModal = ({ element }: IEmployees | any) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState(element?.name)
  const [email, setEmail] = useState(element?.email)
  const [surname, setSurname] = useState(element?.surname)
  const [position, setPosition] = useState(element?.position)

  async function EditEmployees() {
    await dispatch(fetchEmployeesEdit(element.id, {
      id: element.id,
      name: name,
      surname: surname,
      email: email,
      position: position
    }))
    navigate(0)
  }

  return (
    <div className='EditModal'>
      <form className='input_box'>
        <div>
       <label>name:</label> <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        </div>
        <div>
       <label>surname:</label> <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />

        </div>
        <div>
       <label>email:</label> <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        </div>
        <div>
        <label>position:</label><input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />

        </div>
      <button onClick={() => EditEmployees()}>Save</button>
      <button onClick={() => navigate(0)}>Cancel</button>
      </form>

    </div>
  )
}