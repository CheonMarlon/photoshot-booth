import React from 'react';
import './Homepage.css';
import NavBar from '../NavBar/NavBar';

const Homepage = () => {
  return (
    <div className='home-main'>
        <div className="home-nav">
            <NavBar />
        </div>

      <div className="home-container">
        <div className="home-bg-pics">
            <img src="/assets/selfie.png" alt="selfie" />
        </div>


        <div className="home-title">
            <h1>SnapSpace</h1>
            <p>The fun starts when the flash goes off ⚡</p>
        </div>

        <img className="earth" src="/assets/earth.png" alt='earth' />         


        <div className="start-btn">
            <button>
                <span class="button_top"> Start Booth </span>
            </button>
        </div>


      </div>
    </div>
  );
};

export default Homepage;
