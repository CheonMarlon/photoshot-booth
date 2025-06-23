import React, { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const faqData = [
  {
    question: "How does PhotoShot Photo Booth work?",
    answer: "PhotoShot Photo Booth allows you to capture fun, high-quality photos using your device’s camera. It guides you through taking multiple shots with filters and frames, then compiles them into a shareable photo strip."
  },
  {
    question: "Are my photos stored on your servers?",
    answer: "No, your photos are processed and stored locally on your device only. We do not upload or save any images on our servers to protect your privacy."
  },
  {
    question: "Can I use PhotoShot on my mobile device?",
    answer: "Absolutely! PhotoShot is optimized for both desktop and mobile browsers to provide a smooth experience wherever you are."
  },
  {
    question: "Why can't I retake individual photos?",
    answer: "PhotoShot captures a series of photos as a single set to create your photo strip. To maintain the flow and consistency, you need to retake the entire set if you want to change any photo."
  },
  {
    question: "What filters and frames are available?",
    answer: "We offer a variety of fun filters like Black & White, Sepia, Vintage, and playful frames including seasonal and themed options that you can apply before taking your photos."
  },
  {
    question: "Can I use PhotoShot for commercial purposes?",
    answer: "Yes, PhotoShot can be used for commercial events, but please ensure you comply with local laws and respect privacy guidelines when capturing photos."
  },
  {
    question: "My camera isn't working. What should I do?",
    answer: "Please check if your browser has permission to access the camera. Try refreshing the page or restarting your device. If the problem persists, try using a different browser or device."
  }
];

const FAQModal = ({ isOpen, onRequestClose }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="FAQ Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1000
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
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#3a3a3a' }}>Frequently Asked Questions</h2>
      <div>
        {faqData.map(({ question, answer }, index) => (
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
            }}
            onClick={() => toggleIndex(index)}
          >
            <h3 style={{ margin: 0, color: '#2c3e50', fontWeight: '600', fontSize: '1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {question}
              <span style={{ fontSize: '1.3rem', userSelect: 'none' }}>
                {openIndex === index ? '−' : '+'}
              </span>
            </h3>
            {openIndex === index && (
              <p style={{ marginTop: '10px', color: '#555', lineHeight: '1.5', fontSize: '0.95rem' }}>
                {answer}
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

export default FAQModal;
