// src/components/Doctors.js
import React, { useState, useContext } from 'react';
import '../styles/DoctorRegistration.css';
import '../styles/DoctorLogin.css';
import '../styles/Appointments.css';
import { AppointmentsContext } from '../context/AppointmentsContext';

const DoctorRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phone: '',
        address: '',
        doctorId: '',
        speciality: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Doctor Registration Data:', formData);
        alert('Doctor registration successful!');
        setFormData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            phone: '',
            address: '',
            doctorId: '',
            speciality: '',
            password: ''
        });
    };

    return (
        <div className="form-container">
            <div className="card">
                <h2>Doctor Registration</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    <input type="tel" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                    <input type="text" name="doctorId" placeholder="Doctor ID" value={formData.doctorId} onChange={handleChange} required />
                    <input type="text" name="speciality" placeholder="Speciality" value={formData.speciality} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Login Password" value={formData.password} onChange={handleChange} required minLength="8" />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

const DoctorLogin = () => {
    const [loginData, setLoginData] = useState({
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Doctor Login Data:', loginData);
        alert('Doctor login successful!');
        setLoginData({
            phone: '',
            password: ''
        });
    };

    return (
        <div className="form-container">
            <div className="card">
                <h2>Doctor Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="tel" name="phone" placeholder="Phone No" value={loginData.phone} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Login Password" value={loginData.password} onChange={handleChange} required minLength="8" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

const DoctorManageAppointments = () => {
    const { appointments, approveAppointment, deleteAppointment } = useContext(AppointmentsContext);

    return (
        <div className="appointments-container">
            <h2>Manage Appointments</h2>
            {appointments.length === 0 ? (
                <p>No appointments available</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id} className="appointment-card">
                            <div className="appointment-details">
                                <p>Patient: {appointment.patientName}</p>
                                <p>Gender: {appointment.gender}</p>
                                <p>Date: {appointment.date}</p>
                                <p>Time: {appointment.time}</p>
                                <p>Doctor: {appointment.doctor}</p>
                                <p>Speciality: {appointment.speciality}</p>
                                <p>Status: {appointment.status}</p>
                            </div>
                            <div className="appointment-buttons">
                                {appointment.status === 'pending' && (
                                    <button onClick={() => approveAppointment(appointment.id)}>Approve</button>
                                )}
                                <button onClick={() => deleteAppointment(appointment.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export { DoctorRegistration, DoctorLogin, DoctorManageAppointments };
