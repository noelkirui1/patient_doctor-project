// Patient.js

import React, { useState, useContext } from 'react';
import AppointmentsContext from './AppointmentsContext';
import './Patients.css';

const PatientLogin = ({ onLogin }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="card">
      <form onSubmit={handleLogin}>
        <h3>Patient Login</h3>
        <input type="text" placeholder="Patient ID" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    address: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Example: Log form data
    // Implement registration logic here
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Patient Register</h3>
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="dob" type="date" onChange={handleChange} required />
      <input name="phone" placeholder="Phone No" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Login Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

const PatientProfileUpdate = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    address: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Example: Log form data
    // Implement profile update logic here
  };

  return (
    <form onSubmit={handleSubmit} className="card profile-update">
      <h3>Patient Profile Update</h3>
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="dob" type="date" onChange={handleChange} required />
      <input name="phone" placeholder="Phone No" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Login Password" onChange={handleChange} required />
      <button type="submit">Update Profile</button>
    </form>
  );
};

const ScheduleAppointment = () => {
  const { handleAppointmentScheduling } = useContext(AppointmentsContext);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [patientAge, setPatientAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = {
      doctor: selectedDoctor,
      date: appointmentDate,
      time: appointmentTime,
      age: patientAge,
    };
    handleAppointmentScheduling(appointment);
    setSelectedDoctor('');
    setAppointmentDate('');
    setAppointmentTime('');
    setPatientAge('');
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Schedule Appointment</h3>
      <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
        <option value="">Select Doctor</option>
        <option value="Dr. John Doe">Dr. John Doe</option>
        <option value="Dr. Jane Smith">Dr. Jane Smith</option>
      </select>
      <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
      <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required />
      <input type="text" placeholder="Age" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} required />
      <button type="submit">Schedule</button>
    </form>
  );
};

const PatientDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="patient-dashboard">
      <h2>Patient Dashboard</h2>
      {!isLoggedIn ? (
        <>
          <PatientLogin onLogin={handleLogin} />
          <button onClick={() => setShowRegistration(!showRegistration)}>Register</button>
          {showRegistration && <PatientRegister />}
        </>
      ) : (
        <>
          <PatientProfileUpdate />
          <ScheduleAppointment />
        </>
      )}
    </div>
  );
};

export default PatientDashboard;
