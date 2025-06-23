import React, { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const privacySections = [
  {
    title: 'Information We Collect',
    content:
      'We do not collect any personal information or photos from your device. All photos you take using PhotoShot are processed and stored only on your device and are never uploaded to our servers.'
  },
  {
    title: 'How We Use Your Information',
    content:
      'Since your photos and data remain on your device, we do not use or share any personal data. Our app operates entirely locally to ensure your privacy.'
  },
  {
    title: 'Third-Party Services',
    content:
      'We do not integrate with any third-party services that collect personal information.'
  },
  {
    title: 'Security',
    content:
      'We take reasonable measures to keep the app secure. However, please ensure you use a secure device and browser to protect your photos.'
  },
  {
    title: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy occasionally. Any changes will be reflected here, so please check back periodically.'
  },
  {
    title: 'Contact Us',
    content:
      'If you have any questions about this Privacy Policy, please contact us at support@photoshot.com.'
  }
];

const PrivacyModal = ({ isOpen, onRequestClose }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Privacy Policy Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)'
        },
        content: {
          maxWidth: '600px',
          margin: 'auto',
          borderRadius: '12px',
          padding: '30px 40px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          backgroundColor: '#fffef9',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#3a3a3a' }}>Privacy Policy</h2>
      <p style={{ marginBottom: '1.5rem', color: '#555' }}>
        At PhotoShot Photo Booth, your privacy is very important to us. This policy explains how we collect, use, and protect your information when you use our app.
      </p>
      <div>
        {privacySections.map(({ title, content }, index) => (
          <div
            key={index}
            style={{
              marginBottom: '15px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              backgroundColor: openIndex === index ? '#e6e6ff' : '#fafafa',
              cursor: 'pointer',
              padding: '15px 20px',
              boxShadow: openIndex === index ? '0 0 10px #b0b0ff' : 'none',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              userSelect: 'none'
            }}
            onClick={() => toggleIndex(index)}
          >
            <h3 style={{ margin: 0, color: '#2c3e50', fontWeight: '600', fontSize: '1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {title}
              <span style={{ fontSize: '1.3rem', userSelect: 'none' }}>
                {openIndex === index ? '−' : '+'}
              </span>
            </h3>
            {openIndex === index && (
              <p style={{ marginTop: '10px', color: '#555', lineHeight: '1.5', fontSize: '0.95rem' }}>
                {content}
              </p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={onRequestClose}
        style={{
          display: 'block',
          margin: '30px auto 0',
          padding: '10px 25px',
          backgroundColor: '#ffffff',
          color: '#000000',
          border: '2px solid #000000',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '1rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          e.target.style.backgroundColor = '#000000';
          e.target.style.color = '#ffffff';
          e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={e => {
          e.target.style.backgroundColor = '#ffffff';
          e.target.style.color = '#000000';
          e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
        }}
      >
        Close
      </button>
    </ReactModal>
  );
};

export default PrivacyModal;
