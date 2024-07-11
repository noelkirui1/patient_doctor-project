// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './components/Doctors'; // Adjusted import path
import PatientDashboard from './components/Patients'; // Adjusted import path
import { AppointmentsProvider } from './components/AppointmentsContext'; // Adjusted import path
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';

const App = () => {
    return (
    <div>
       <NavBar/>

       <Routes>
        <Route path='/' element={<LandingPage/>}/>
       {/* <Route path='/admin_login' element={<Admin/>}/>*/}
        <Route path='/patient-dashboard'element={<PatientDashboard/>}/>
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
       {/* <Route path='/register' element={<Register/>}/>*/}
       </Routes>
       
    </div>
    );
};

export default App;
