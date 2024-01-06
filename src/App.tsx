import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import { ToDoListPage } from './pages/ToDoListPage';
import { Authpage } from './pages/Authpage';
import { RegistrationPage } from './pages/RegistrationPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Authpage/>}/>
        <Route path='/registration' element={<RegistrationPage/>}/>
        <Route path='/todo' element={<ToDoListPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
