// src/components/Patients.js
import React, { useState, useContext } from 'react';
import '../styles/PatientRegistration.css';
import '../styles/PatientLogin.css';
import { AppointmentsContext } from '../context/AppointmentsContext';

const PatientRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phone: '',
        password: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Patient Registration Data:', formData);
        alert('Patient registration successful!');
        setFormData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            phone: '',
            password: '',
            address: ''
        });
    };

    return (
        <div className="form-container">
            <div className="card">
                <h2>Patient Registration</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    <input type="tel" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Login Password" value={formData.password} onChange={handleChange} required minLength="8" />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

const PatientLogin = () => {
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
        console.log('Patient Login Data:', loginData);
        alert('Patient login successful!');
        setLoginData({
            phone: '',
            password: ''
        });
    };

    return (
        <div className="form-container">
            <div className="card">
                <h2>Patient Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="tel" name="phone" placeholder="Phone No" value={loginData.phone} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Login Password" value={loginData.password} onChange={handleChange} required minLength="8" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

const PatientScheduleAppointment = () => {
    const { addAppointment } = useContext(AppointmentsContext);
    const [formData, setFormData] = useState({
        patientName: '',
        date: '',
        time: '',
        gender: '',
        doctor: '',
        speciality: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addAppointment(formData);
        alert('Appointment scheduled successfully!');
        setFormData({
            patientName: '',
            date: '',
            time: '',
            gender: '',
            doctor: '',
            speciality: ''
        });
    };

    return (
        <div className="form-container">
            <div className="card">
                <h2>Schedule Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} required />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="text" name="doctor" placeholder="Doctor" value={formData.doctor} onChange={handleChange} required />
                    <input type="text" name="speciality" placeholder="Speciality" value={formData.speciality} onChange={handleChange} required />
                    <button type="submit">Schedule</button>
                </form>
            </div>
        </div>
    );
};

export { PatientRegistration, PatientLogin, PatientScheduleAppointment };
