import React, { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const ContactModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Contact Us Modal"
      style={{
        overlay: { backgroundColor: 'rgba(0,0,0,0.5)' },
        content: {
          maxWidth: '500px',
          margin: 'auto',
          borderRadius: '10px',
          padding: '30px',
          backgroundColor: '#fff',
          border: '2px solid #000',
          boxShadow: '0 8px 15px rgba(0,0,0,0.3)',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }
      }}
    >
      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#222' }}>Contact Us</h2>
      <form
        action="https://formsubmit.co/marlonpinpin138@gmail.com"
        method="POST"
        onSubmit={(e) => {
          if (!validate()) e.preventDefault();
        }}
        target="_blank"
        noValidate
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          <label style={labelStyle}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle(errors.name)}
            placeholder="Your full name"
          />
          {errors.name && <small style={errorStyle}>{errors.name}</small>}

          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle(errors.email)}
            placeholder="you@example.com"
          />
          {errors.email && <small style={errorStyle}>{errors.email}</small>}

          <label style={labelStyle}>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            style={textareaStyle(errors.message)}
            placeholder="Write your message here..."
          />
          {errors.message && <small style={errorStyle}>{errors.message}</small>}

          <button
            type="submit"
            style={submitButtonStyle}
            onMouseEnter={e => (e.target.style.backgroundColor = '#333')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#000')}
          >
            Send Message
          </button>
        </div>
      </form>

      <button
        onClick={onRequestClose}
        style={{
          marginTop: '20px',
          background: 'transparent',
          border: 'none',
          color: '#000',
          fontWeight: '600',
          cursor: 'pointer',
          textDecoration: 'underline',
          fontSize: '0.9rem',
          display: 'block',
          marginLeft: 'auto'
        }}
      >
        Close
      </button>
    </ReactModal>
  );
};

// Reusable styles
const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: '600',
  color: '#111',
  alignSelf: 'flex-start',
  width: '60%'
};

const inputStyle = (hasError) => ({
  width: '60%',
  padding: '10px',
  marginBottom: hasError ? '5px' : '20px',
  border: hasError ? '2px solid #e74c3c' : '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '1rem'
});

const textareaStyle = (hasError) => ({
  width: '60%',
  padding: '10px',
  marginBottom: hasError ? '5px' : '20px',
  border: hasError ? '2px solid #e74c3c' : '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '1rem',
  resize: 'vertical'
});

const errorStyle = {
  color: '#e74c3c',
  alignSelf: 'flex-start',
  width: '60%'
};

const submitButtonStyle = {
  width: '50%',
  padding: '12px',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1.1rem',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

export default ContactModal;
