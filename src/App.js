import React from 'react';
import Crud from './Components/Crud';
import Creates from './Components/Creates';
import Creates_Image from './Components/Creates_Image';
import Register from './Components/Credentials/Register';
import Login from './Components/Credentials/Login';
import HomePage from './Components/HomePage';
import {  BrowserRouter, Routes, Route  } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
      <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route exact path="login/" element={<Login />}></Route>
                    <Route path="register/" element={<Register/>}></Route>
                    <Route path="/dash" element={<Crud/>}></Route>
                </Routes> 
            </div>
          </BrowserRouter>
    );
}

export default App;
