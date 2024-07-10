// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
//import { PatientRegistration, PatientLogin, PatientScheduleAppointment } from './components/Patients';
//import { DoctorRegistration, DoctorLogin, DoctorManageAppointments } from './components/Doctors';
//import { AppointmentsProvider } from './context/AppointmentsContext';
import './App.css';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Register from './components/Register';

const App = () => {
    return (
    <div>
       <NavBar/>

       <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/admin_login' element={<Admin/>}/>
        <Route path='/patient_login'element={<Patients/>}/>
        <Route path='/doctor_login' element={<Doctors/>}/>
        <Route path='/register' element={<Register/>}/>
       </Routes>
       
    </div>
    );
};

export default App;
