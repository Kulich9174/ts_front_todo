import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import { ToDoListPage } from './pages/ToDoListPage';
import { Authpage } from './pages/Authpage';
import { RegistrationPage } from './pages/RegistrationPage';
import { MainPage } from './pages/MainPage';
import { TaskFormPage } from './pages/FormTaskPage';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/registration' element={<RegistrationPage/>}/>
        <Route path='/todo' element={<ToDoListPage/>}/>
        <Route path='/auth' element={<Authpage/>}/>
        <Route path='/form' element={<TaskFormPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
