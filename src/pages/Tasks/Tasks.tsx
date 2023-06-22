import React, { useEffect, useState } from 'react';
import './Tasks.scss';
import { fetchTasks, fetchTasksDelete, fetchSearchTasks } from '../../store/action/TasksAction';
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { ITasks } from '../../models/model';
import { useNavigate } from 'react-router-dom';
import { AddTasks } from '../../components/addTasks';
import { EditTasks } from '../../components/editTasks';

export const Tasks = () => {
  const { Tasks } = useAppSelector(state => state.Tasks);
  const { SearchTasks } = useAppSelector(state => state.Tasks);
  const [editItem, setEditItem] = useState<ITasks | undefined>();
  const [addbutton, setAddbutton] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [searchItem, setSearchItem] = useState<string>('');
  const [limit, setLimit] = useState(5);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [all,setAll] = useState(false)

  useEffect(() => {
    dispatch(fetchTasks(page, limit, setPage));
  }, [dispatch, page,all,]);




  function backPage() {
    setPage(prevPage => prevPage - 1);
  }

  function nextPage() {
    setPage(prevPage => prevPage + 1);
  }

  async function DeleteTasks(id: number) {
    await dispatch(fetchTasksDelete(id));
    dispatch(fetchTasks(page, limit, setPage));
  }

  function searchTasks() {
    dispatch(fetchSearchTasks(searchItem, search));
  }

  return (
    <>
      <div className='Tasks'>
        <div className='searchTasks'>
          <span>Search in:</span>
          <select name="" id="" onChange={(e) => setSearchItem(e.target.value)}>
            <option value="" disabled hidden>Choose here</option>
            <option value="name_like">Name</option>
            <option value="description_like">Description</option>
            <option value="startDate">StartDate</option>
            <option value="endDate">EndDate</option>
          </select>
          <input type="search" onChange={(e) => setSearch(e.target.value)} />
          <button onClick={searchTasks}>Search</button>
          {SearchTasks && <button onClick={() => setAll(!all)}>See All</button>}
        </div>
        <div className='Tasks_container'>
          {SearchTasks.length > 0 ? (
            SearchTasks?.map((el: ITasks) => (
              <div key={el?.id} className='Tasks_item'>
                <div className='Tasks_field'>Id: {el?.id}</div>
                <div className='Tasks_field'>EmployeeId: {el?.employeeId}</div>
                <div className='Tasks_field'>Name: {el?.name}</div>
                <div className='Tasks_field'>Description: {el?.description}</div>
                <div className='Tasks_field'>StartDate: {el?.startDate}</div>
                <div className='Tasks_field'>EndDate: {el?.endDate}</div>
                <div className='Tasks_buttons'>
                  <button onClick={() => setEditItem(el)}>Edit</button>
                  <button onClick={() => DeleteTasks(el.id)}>Delete</button>
                </div>   <div className="Employees_header">
              <div className="Employees_headerItem"></div>
              <div className="Employees_headerItem">Name</div>
              <div className="Employees_headerItem">Surname</div>
              <div className="Employees_headerItem">Email</div>
              <div className="Employees_headerItem">Position</div>
              <div className="Employees_headerItem">Edit / Delete</div>
              <div className="Employees_headerItem">View Profile</div>
            </div>
              </div>
            ))
          ) : (
            Tasks?.map((el: ITasks) => (
              <div key={el?.id} className='Tasks_item'>
                <div className='Tasks_field'>Id: {el?.id}</div>
                <div className='Tasks_field'>EmployeeId: {el?.employeeId}</div>
                <div className='Tasks_field'>Name: {el?.name}</div>
                <div className='Tasks_field'>Description: {el?.description}</div>
                <div className='Tasks_field'>StartDate: {el?.startDate}</div>
                <div className='Tasks_field'>EndDate: {el?.endDate}</div>
                <div className='Tasks_buttons'>
                  <button onClick={() => setEditItem(el)}>Edit</button>
                  <button onClick={() => DeleteTasks(el.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="buttonContainer">
          <button onClick={backPage}>back</button>
          <button onClick={nextPage}>next</button>
          <button onClick={() => { setAddbutton(true) }}>Add Tasks</button>
        </div>
        {editItem && <EditTasks element={editItem} setEditItem={setEditItem} page={page} limit={5} setPage={setPage} />}
        {addbutton && <AddTasks setAddbutton={setAddbutton} page={page} limit={5} setPage={setPage} />}
      </div>
    </>
  );
};
