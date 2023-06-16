import React from 'react';
import { Route,Routes } from 'react-router-dom';
import { Employees } from './pages/Employees';
import { EmployeesProfil } from './pages/EmployeesProfil';
import { Tasks } from './pages/Tasks';
import { Home } from './pages/Home';
import { Header } from './components/header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='employees' element={<Employees/>} />
        <Route path='tasks' element={<Tasks/>} />
        <Route path='/employeesProfil/:id'  element={<EmployeesProfil/>} />
      </Routes>
    </div>
  );
}

export default App;
