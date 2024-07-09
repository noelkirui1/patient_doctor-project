import React,{useContext} from "react";
import {Link} from 'react-router-dom';
import {UserContext} from '../contexts/UserContext'

const NavBar=()=>{
    const {user,logout}=useContext(UserContext);

    const renderLinks=()=>{
        if(user.role === 'main_admin'){
            return(
                <>
                <Link to='/admin/requests'>Approve Requests</Link>
                <Link to="/admin/doctors">Manage Doctors</Link>
                <Link to="/admin/patients">Manage Patients</Link>
                </>
            );
        }
        if (user.role === 'doctor'){
            return (
                <>
                <Link to="/doctor/appointments">Appointments</Link>
                <Link to="/doctor/profile">Profile</Link>
                </>
            );
        }
        if (user.role === 'patient'){
            return(
                <>
                <Link to="/patient/appointments">Appointments</Link>
                <Link to="/patient/profile">Profile</Link>
                </>
            );
        }
         return (
            <>
                <Link to="/login">Login</Link>
                <Link to="/register/patient">Register as Patient</Link>
                <Link to="/register/doctor">Register as Doctor</Link>
            </>
        );
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {renderLinks()}
            {user && <button onClick={logout}>Logout</button>}
        </nav>
    );
};

export default NavBar;

