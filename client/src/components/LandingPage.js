import React from 'react';

import '../styles/LandingPage.css';
import About from './About';


function LandingPage() {
    return (
       <>
            <main className="landing-main">
        
                <h2>Welcome to MediCare+</h2>
                <p>Your one-stop solution for managing doctor appointments and medical records.</p>
                
            </main>
      <About/>
      </>
    );
}

export default LandingPage;


