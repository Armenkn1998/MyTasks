import "./Employees.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEmployees, fetchEmployeesDelete } from "../../store/action/EmployeesAction";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { IEmployees } from "../../models/model";
import { EditModal } from "../../components/editModal";
import { useNavigate } from "react-router-dom";
import { AddModal } from "../../components/addModal";

export const Employees = () => {
  const { Employees, loading } = useAppSelector((state) => state.Employees);
  const [editItem, setEditItem] = useState<IEmployees | undefined>();
  const [addbutton, setAddbutton] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchEmployees(page, 5, setPage));
  }, [dispatch, page]);

  function backPage() {
    setPage(--page);
  }
  function nextPage() {
    setPage(++page);
  }

  async function DeleteEmployees(id: number) {
    await dispatch(fetchEmployeesDelete(id));
    dispatch(fetchEmployees(page, 5, setPage));
  }

  return (
    <>
      {loading ? (
        <p className="loading">loading...</p>
      ) : (
        <div className="Employees" id="Employees">
          <div className="Employees_body">
            {Employees?.map((el: IEmployees) => (
              <div key={el?.id} className="Employees_row">
                <div className="Employees_cell">Id: {el?.id}</div>
                <div className="Employees_cell">Name: {el?.name}</div>
                <div className="Employees_cell">Surname: {el?.surname}</div>
                <div className="Employees_cell">Email: {el?.email}</div>
                <div className="Employees_cell">Position: {el?.position}</div>
                <div className="Employees_cell">
                  <button onClick={() => setEditItem(el)}>Edit</button>
                  <button onClick={() => DeleteEmployees(el.id)}>Delete</button>
                </div>
                <div className="Employees_cell">
                  <Link to={"/employeesProfil/" + el.id}>View</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="buttonContainer">
            <button onClick={() => backPage()}>back</button>
            <button onClick={() => nextPage()}>next</button>
            <button onClick={() => setAddbutton(true)}>Add Employees</button>
          </div>
          {editItem && (
            <EditModal
              element={editItem}
              setEditItem={setEditItem}
              page={page}
              limit={5}
              setPage={setPage}
            />
          )}
          {addbutton && (
            <AddModal
              setAddbutton={setAddbutton}
              page={page}
              limit={5}
              setPage={setPage}
            />
          )}
        </div>
      )}
    </>
  );
};
