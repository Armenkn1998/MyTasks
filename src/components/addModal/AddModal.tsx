import './AddModal.scss'
import { useState } from 'react'
import { fetchEmployees, fetchEmployeesAdd, fetchEmployeesEdit } from '../../store/action/EmployeesAction'
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from 'react-router-dom';

export const AddModal = ({ setAddbutton,page,limit,setPage}: any,) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [surname, setSurname] = useState('')
    const [position, setPosition] = useState('')

    async function AddEmployees() {
        const newEmployees: any = {
            name,
            surname,
            email,
            position
        }

        await dispatch(fetchEmployeesAdd(newEmployees))
        await dispatch(fetchEmployees(page,limit,setPage))
        setAddbutton("")

    }

    return (
        <div className='ADDModal'>
            <form className='addForm' >
                <div><label>Name:</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div><label>Email:</label><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><label>Surname:</label><input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} /></div>
                <div><label>Position:</label><input type="text" value={position} onChange={(e) => setPosition(e.target.value)} /></div>

                <button onClick={() => AddEmployees()}>Save To Add</button>
                <button onClick={() => setAddbutton("")}>Cancel</button>
            </form>
        </div>
    )
}