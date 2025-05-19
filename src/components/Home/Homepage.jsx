import React, { useState } from 'react';
import './Homepage.css';
import NavBar from '../NavBar/NavBar';

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleStartClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
          <button onClick={handleStartClick}>
            <span className="button_top"> Start Booth </span>
          </button>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>How to use SnapSpace</h2>
              <p>Get ready for a fun and fast-paced photo session.</p>
              <p>📸 The booth will take <strong>4 consecutive photos</strong>, with <strong>3 seconds between</strong> each shot.</p>
              <p>🎭 There are <strong>no retakes</strong>, so strike your best pose each time!</p>
              <p>Once you're done, you can <strong>download your digital copy</strong> and <strong>share the memories</strong> with friends.</p>
              <button className="ready-btn" onClick={closeModal}>Are you ready?</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
