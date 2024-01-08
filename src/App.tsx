import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import { ToDoListPage } from './pages/ToDoListPage';
import { Authpage } from './pages/Authpage';
import { RegistrationPage } from './pages/RegistrationPage';
import { MainPage } from './pages/MainPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/registration' element={<RegistrationPage/>}/>
        <Route path='/todo' element={<ToDoListPage/>}/>
        <Route path='/auth' element={<Authpage/>}/>
      </Routes>
    </div>
  );
}

export default App;
