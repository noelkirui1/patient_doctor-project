// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './components/Doctors'; // Adjusted import path
import PatientDashboard from './components/Patients'; // Adjusted import path
import { AppointmentsProvider } from './components/AppointmentsContext'; // Adjusted import path

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
