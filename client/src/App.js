// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './components/Doctors'; // Adjusted import path
import PatientDashboard from './components/Patients'; // Adjusted import path
import { AppointmentsProvider } from './components/AppointmentsContext'; // Adjusted import path

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppointmentsProvider>
          <Routes>
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
          </Routes>
        </AppointmentsProvider>
      </div>
    </Router>
  );
};

export default App;
