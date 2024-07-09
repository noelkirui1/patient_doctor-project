// src/context/AppointmentsContext.js
import React, { createContext, useState } from 'react';

const AppointmentsContext = createContext();

const AppointmentsProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);

    const addAppointment = (appointment) => {
        setAppointments([...appointments, { ...appointment, id: Date.now(), status: 'pending' }]);
    };

    const approveAppointment = (id) => {
        setAppointments(appointments.map(appt => appt.id === id ? { ...appt, status: 'approved' } : appt));
    };

    const deleteAppointment = (id) => {
        setAppointments(appointments.filter(appt => appt.id !== id));
    };

    return (
        <AppointmentsContext.Provider value={{ appointments, addAppointment, approveAppointment, deleteAppointment }}>
            {children}
        </AppointmentsContext.Provider>
    );
};

export { AppointmentsContext, AppointmentsProvider };
