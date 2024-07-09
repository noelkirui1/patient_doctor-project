import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PatientRegistration, PatientLogin } from './components/Patients';
import { DoctorRegistration, DoctorLogin } from './components/Doctors';
import './App.css'; // Correct path to your CSS file

const App = () => {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav>
                        {/* Patient navigation */}
                        <Link className="App-link" to="/patients">Patients</Link>
                        <Link className="App-link" to="/patients/login">Patient Login</Link>

                        {/* Doctors navigation */}
                        <Link className="App-link" to="/doctors">Doctors</Link>
                        <Link className="App-link" to="/doctors/login">Doctor Login</Link>
                    </nav>
                </header>
                <div className="App-content">
                    <Routes>
                        {/* Routes for Patients */}
                        <Route path="/patients" element={<PatientRegistration />} />
                        <Route path="/patients/login" element={<PatientLogin />} />

                        {/* Routes for Doctors */}
                        <Route path="/doctors" element={<DoctorRegistration />} />
                        <Route path="/doctors/login" element={<DoctorLogin />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
