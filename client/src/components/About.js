
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import {faHippo, faPhone, faEnvelope, faCar} from '@fortawesome/free-solid-svg-icons'
//import { faTwitter, faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import NavBar from './NavBar'; // Assuming NavBar component is in a separate file
import '../styles/About.css';

function About() {
    return (
        <div className="about-container">
            
            <main className="about-main">
                <section className="about-section">
                    <h2>About MediCare+</h2>
                    <p>MediCare+ is your comprehensive solution for managing doctor-patient appointments and medical records efficiently.</p>
                    <p>Key Features:</p>
                    <ul>
                        <li>Easy appointment scheduling for patients.</li>
                        <li>Secure access to medical records.</li>
                        <li>Role-based access control for doctors, patients, and administrators.</li>
                        <li>Real-time notifications and reminders.</li>
                        <li>Telemedicine support for virtual consultations.</li>
                    </ul>
                    <p>With MediCare+, managing your healthcare appointments has never been easier.</p>
                    <p>&copy; {new Date().getFullYear()} MediCare+. All rights reserved.</p>
                </section>
            </main>
        </div>
    );
}

export default About;


