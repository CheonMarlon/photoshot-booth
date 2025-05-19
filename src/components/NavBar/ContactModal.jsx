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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`Thank you, ${formData.name}! Your message has been sent.`);
      setFormData({ name: '', email: '', message: '' });
      onRequestClose();
    }
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
      <form onSubmit={handleSubmit} noValidate>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',  // This centers children horizontally
          }}
        >
          <label
            style={{
              display: 'block',
              marginBottom: '6px',
              fontWeight: '600',
              color: '#111',
              alignSelf: 'flex-start', // label aligns left but input centered
              width: '60%'
            }}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '60%',
              padding: '10px',
              marginBottom: errors.name ? '5px' : '20px',
              border: errors.name ? '2px solid #e74c3c' : '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
            placeholder="Your full name"
          />
          {errors.name && <small style={{ color: '#e74c3c', alignSelf: 'flex-start', width: '60%' }}>{errors.name}</small>}

          <label
            style={{
              display: 'block',
              marginBottom: '6px',
              fontWeight: '600',
              color: '#111',
              alignSelf: 'flex-start',
              width: '60%'
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '60%',
              padding: '10px',
              marginBottom: errors.email ? '5px' : '20px',
              border: errors.email ? '2px solid #e74c3c' : '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
            placeholder="you@example.com"
          />
          {errors.email && <small style={{ color: '#e74c3c', alignSelf: 'flex-start', width: '60%' }}>{errors.email}</small>}

          <label
            style={{
              display: 'block',
              marginBottom: '6px',
              fontWeight: '600',
              color: '#111',
              alignSelf: 'flex-start',
              width: '60%'
            }}
          >
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            style={{
              width: '60%',
              padding: '10px',
              marginBottom: errors.message ? '5px' : '20px',
              border: errors.message ? '2px solid #e74c3c' : '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
            placeholder="Write your message here..."
          />
          {errors.message && <small style={{ color: '#e74c3c', alignSelf: 'flex-start', width: '60%' }}>{errors.message}</small>}

          <button
            type="submit"
            style={{
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
            }}
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

export default ContactModal;
