import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Customization.css';

const Customization = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const layout = location.state?.layout;
  const photos = location.state?.photos || [];

  useEffect(() => {
    if (!layout || photos.length === 0) {
      navigate('/');
    }
  }, [layout, photos, navigate]);

  const [theme, setTheme] = useState('white');

  const layoutToGrid = {
  '4x1': { columns: 4, rows: 1 },
  '2x2': { columns: 2, rows: 2 },
  '3x2': { columns: 3, rows: 2 },
};

const { columns, rows } = layoutToGrid[layout] || { columns: 1, rows: photos.length };

  return (
    <div className="customization-page">
      {/* Left: Photo Strip */}
        <div
        className={`photo-strip-wrapper theme-${theme}`}
        style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '10px',
            width: columns === 1 ? '250px' : `${columns * 120}px`,
        }}
        >
        {photos.map((src, i) => (
            <div key={i} className="photo-frame">
            <img src={src} alt={`photo-${i}`} className="photo-image" />
            </div>
        ))}
        <div className="timestamp" style={{ gridColumn: `span ${columns}` }}>
            Picopixa {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        </div>

      {/* Right: Customization Options */}
      <div className="controls-panel">
        <h3>Customize your photo strip</h3>
        <div className="section">
          <h4>Frame colour</h4>
          <div className="color-options">
            {['white', 'black', 'pink', 'green', 'blue', 'yellow', 'purple', 'maroon', 'burgundy'].map((color) => (
              <button key={color} className="custom-button" onClick={() => setTheme(color)}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="bottom-buttons">
          <button className="custom-button">Download</button>
          <button className="custom-button" onClick={() => navigate('/')}>Take New Photos</button>
        </div>
      </div>
    </div>
  );
};

export default Customization;
