import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { UserContext } from '../contexts/UserContext';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const { user } = useContext(UserContext);

    // Fetch appointments from the backend
    useEffect(() => {
        fetch('http://localhost:5000/appointments', {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            return response.json();
        })
        .then(data => {
            setAppointments(data);
        })
        .catch(error => {
            console.error('Error fetching appointments', error);
            setError('Failed to fetch appointments. Please try again.');
        });
    }, [user.token]);

    // Formik for scheduling a new appointment
    const formik = useFormik({
        initialValues: {
            date: '',
        },
        onSubmit: (values, { resetForm }) => {
            fetch('http://localhost:3000/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ date: values.date }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to schedule appointment');
                }
                return response.json();
            })
            .then(data => {
                setAppointments([...appointments, data]);
                resetForm();
            })
            .catch(error => {
                console.error('Error scheduling appointment', error);
                setError('Failed to schedule appointment. Please try again.');
            });
        },
    });

    // Handle deleting an appointment
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/appointments/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete appointment');
            }
            setAppointments(appointments.filter(appointment => appointment.id !== id));
        })
        .catch(error => {
            console.error('Error deleting appointment', error);
            setError('Failed to delete appointment. Please try again.');
        });
    };

    return (
        <div>
            <h1>Appointments</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="date"
                    name="date"
                    onChange={formik.handleChange}
                    value={formik.values.date}
                    required
                />
                <button type="submit">Schedule Appointment</button>
            </form>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        {appointment.date}
                        <button onClick={() => handleDelete(appointment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appointments