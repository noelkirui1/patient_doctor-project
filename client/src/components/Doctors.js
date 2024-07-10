// Doctor.js

import React, { useState, useContext } from 'react';
import AppointmentsContext from './AppointmentsContext';
import './Doctors.css';

const DoctorLogin = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Doctor Login</h3>
      <input type="text" placeholder="Doctor ID" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    address: '',
    doctorId: '',
    specialty: '',
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
      <h3>Doctor Register</h3>
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="dob" type="date" onChange={handleChange} required />
      <input name="phone" placeholder="Phone No" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="doctorId" placeholder="Doctor ID" onChange={handleChange} required />
      <input name="specialty" placeholder="Specialty" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Login Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

const DoctorProfileUpdate = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    address: '',
    doctorId: '',
    specialty: '',
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
      <h3>Doctor Profile Update</h3>
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="dob" type="date" onChange={handleChange} required />
      <input name="phone" placeholder="Phone No" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="doctorId" placeholder="Doctor ID" onChange={handleChange} required />
      <input name="specialty" placeholder="Specialty" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Login Password" onChange={handleChange} required />
      <button type="submit">Update Profile</button>
    </form>
  );
};

const AppointmentRequests = () => {
  const { appointments, handleAppointmentApproval, handleAppointmentDeletion } = useContext(AppointmentsContext);

  const handleApprove = (id) => {
    handleAppointmentApproval(id);
  };

  const handleDelete = (id) => {
    handleAppointmentDeletion(id);
  };

  return (
    <div className="appointment-requests">
      <h3>Appointment Requests</h3>
      {appointments.map((appointment) => (
        <div key={appointment.id} className="appointment-card">
          <p>{appointment.details}</p>
          <button onClick={() => handleApprove(appointment.id)}>Approve</button>
          <button onClick={() => handleDelete(appointment.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const DoctorDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="doctor-dashboard">
      <h2>Doctor Dashboard</h2>
      {!isLoggedIn ? (
        <>
          <DoctorLogin onLogin={handleLogin} />
          <button onClick={() => setShowRegistration(!showRegistration)}>Register</button>
          {showRegistration && <DoctorRegister />}
        </>
      ) : (
        <>
          <DoctorProfileUpdate />
          <AppointmentRequests />
        </>
      )}
    </div>
  );
};

export default DoctorDashboard;
