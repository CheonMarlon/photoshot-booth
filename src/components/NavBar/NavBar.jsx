import React, { useState } from 'react';
import FAQModal from './FAQModal';
import PrivacyModal from './PrivacyModal';
import ContactModal from './ContactModal';
import './NavBar.css';

const NavBar = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <div className="nav-container">
        <div className="nav-item" onClick={() => setActiveModal('faq')}>
          <i className="fa-solid fa-person-circle-question"></i>
          <div className="tooltip">FAQ</div>
        </div>

        <div className="nav-item" onClick={() => setActiveModal('privacy')}>
          <i className="fa-solid fa-shield-halved"></i>
          <div className="tooltip">Privacy Policy</div>
        </div>

        <div className="nav-item" onClick={() => setActiveModal('contact')}>
          <i className="fa-solid fa-address-book"></i>
          <div className="tooltip">Contact Us</div>
        </div>
      </div>

      <FAQModal isOpen={activeModal === 'faq'} onRequestClose={() => setActiveModal(null)} />
      <PrivacyModal isOpen={activeModal === 'privacy'} onRequestClose={() => setActiveModal(null)} />
      <ContactModal isOpen={activeModal === 'contact'} onRequestClose={() => setActiveModal(null)} />
    </>
  );
};

export default NavBar;
