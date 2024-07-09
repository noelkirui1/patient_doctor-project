// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PatientRegistration, PatientLogin, PatientScheduleAppointment } from './components/Patients';
import { DoctorRegistration, DoctorLogin, DoctorManageAppointments } from './components/Doctors';
import { AppointmentsProvider } from './context/AppointmentsContext';
import './App.css';

const App = () => {
    return (
        <AppointmentsProvider>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <nav>
                            <Link className="App-link" to="/patients/register">Patient Registration</Link>
                            <Link className="App-link" to="/patients/login">Patient Login</Link>
                            <Link className="App-link" to="/patients/schedule">Schedule Appointment</Link>
                            <Link className="App-link" to="/doctors/register">Doctor Registration</Link>
                            <Link className="App-link" to="/doctors/login">Doctor Login</Link>
                            <Link className="App-link" to="/doctors/manage">Manage Appointments</Link>
                        </nav>
                    </header>
                    <div className="App-content">
                        <Routes>
                            <Route path="/patients/register" element={<PatientRegistration />} />
                            <Route path="/patients/login" element={<PatientLogin />} />
                            <Route path="/patients/schedule" element={<PatientScheduleAppointment />} />
                            <Route path="/doctors/register" element={<DoctorRegistration />} />
                            <Route path="/doctors/login" element={<DoctorLogin />} />
                            <Route path="/doctors/manage" element={<DoctorManageAppointments />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AppointmentsProvider>
    );
};

export default App;
