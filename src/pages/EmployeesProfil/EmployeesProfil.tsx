import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from "../../hooks/redux"
import { fetchEmployeesProfil } from '../../store/action/EmployeesProfilAction'
import { IEmployees, ITasks } from '../../models/model'
import { useParams } from 'react-router-dom'
import './EmployeesProfil.scss'


type IdParams = {
    id: string
}

export const EmployeesProfil = () => {
    const img = 'data:image/jpeg;base64,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'
    const { id } = useParams<IdParams>()
    const { TasksProfil, EmployeesProfil, loading } = useAppSelector(state => state.EmployeesProfil)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchEmployeesProfil(id))
        }
    }, [dispatch,id])
    console.log(TasksProfil);

    return (
        <div className='profil'>
            {loading ? <p className='loading'>Loading...</p> :
                <div className='profil-box'>
                    <img src={img} alt="dsd" />

                    {EmployeesProfil?.map((el: IEmployees) => <div className='infoEmployess'>

                        <p>Name-{el.name}</p>
                        <p>Surname-{el.surname}</p>
                        <p>Position-{el.position}</p>
                    </div>)}
                    <table className='Tasks_table'>
                        <thead className='Tasks_thead'>
                            <tr>
                                <th>Id</th>
                                <th>EmployeeId</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>StartDate</th>
                                <th>EndDate</th>
                            </tr>
                        </thead>
                        <tbody className='Tasks_tbody'>
                            {
                                TasksProfil?.map((el: ITasks) =>
                                    <tr key={el?.id}>
                                        <td>{el?.id}</td>
                                        <td>{el?.employeeId}</td>
                                        <td>{el?.name}</td>
                                        <td>{el?.description}</td>
                                        <td>{el?.startDate}</td>
                                        <td>{el?.endDate}</td>

                                    </tr>)
                            }
                        </tbody>
                    </table>

                </div> }
                
            


        </div >
    )
}
