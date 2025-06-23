import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import domtoimage from 'dom-to-image-more';
import './Customization.css';

const themeBackgrounds = {
  cream: { backgroundColor: '#f9f7f1' },
  charcoal: { backgroundColor: '#2b2b2b' },
  blush: { backgroundColor: '#fddde6' },
  mint: { backgroundColor: '#d1f7e3' },
  sky: { backgroundColor: '#cce7f6' },
  gold: { backgroundColor: '#fff4b3' },
  lavender: { backgroundColor: '#e6dbfa' },
  wine: { backgroundColor: '#5c1a1b' },
  dusk: { backgroundColor: '#3b1c32' },

  cosmos: {
    backgroundImage: `url('/space.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  vhs: {
    backgroundImage: `url('/vhs.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  pastelgrid: {
    backgroundImage: `url('/pastel.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  // 🎮 NEW THEMES
  retro: {
    backgroundImage: `url('/retro.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  doodle: {
    backgroundImage: `url('/doodle.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  kuromi: {
    backgroundImage: `url('/kuromi.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  totoro: {
    backgroundImage: `url('/totoro.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  advtime: {
    backgroundImage: `url('/advtime.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
};


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

  const [theme, setTheme] = useState('filmstrip');
  const [selectedFilter, setSelectedFilter] = useState('None');

  const isDarkTheme = ['charcoal', 'wine', 'dusk', 'cosmos', 'vhs'].includes(theme);

const filterOptions = [
  { name: 'None', filter: 'none' },
  { name: 'Grayscale – Moody & Minimal', filter: 'grayscale(100%)' },
  { name: 'Sepia – Vintage & Warm', filter: 'sepia(70%) contrast(1.1) brightness(1.05)' },
  { name: 'Saturate – Color Pop', filter: 'saturate(160%) contrast(1.1)' },
  { name: 'Contrast Boost – Crisp Edges', filter: 'contrast(140%) brightness(1.05)' },
  { name: 'Soft Glow – Dreamy Blur', filter: 'brightness(1.15) blur(0.8px) saturate(1.1)' },
  { name: 'Retro – 70s Film Look', filter: 'sepia(0.4) contrast(1.2) saturate(1.2) brightness(0.95)' },
  { name: 'Cool Blue – Icy Calm', filter: 'hue-rotate(190deg) saturate(80%) brightness(1.05)' },
  { name: 'Warm Sunset – Golden Hue', filter: 'hue-rotate(-15deg) sepia(0.2) brightness(1.1) saturate(1.1)' },
  { name: 'Muted Pastel – Soft & Subtle', filter: 'saturate(0.6) brightness(1.15) contrast(0.9)' },
  { name: 'High Fashion – Washed Elegance', filter: 'brightness(1.3) contrast(0.85) grayscale(40%)' },
  { name: 'Inverted – Negative Art', filter: 'invert(100%)' },
  { name: 'Cyberpunk – Neon Pop', filter: 'contrast(180%) hue-rotate(280deg) saturate(220%)' },
  { name: 'Film Noir – Deep Shadows', filter: 'grayscale(100%) contrast(180%) brightness(0.9)' },
  { name: 'Rainbow Mood – Psychedelic', filter: 'hue-rotate(360deg) saturate(130%)' },
  { name: 'Golden Hour – Flattering Light', filter: 'sepia(0.2) brightness(1.1) contrast(1.05) saturate(1.2)' },
];


  const layoutToGrid = {
    '4x1': { columns: 1, rows: 4 },
    '2x2': { columns: 2, rows: 2 },
    '3x2': { columns: 3, rows: 2 },
  };

  const { columns } = layoutToGrid[layout] || { columns: 1 };
  const currentFilterStyle = filterOptions.find(f => f.name === selectedFilter)?.filter || 'none';
  const currentBackground = themeBackgrounds[theme] || { backgroundColor: theme };


const handleDownload = () => {
  const stripContainer = document.querySelector('.custom-left');
  if (!stripContainer) return;

  const stripWrapper = stripContainer.querySelector('.photo-strip-wrapper');
  const originalTransform = stripWrapper.style.transform;
  stripWrapper.style.transform = 'none';

  domtoimage.toPng(stripContainer, {
    bgcolor: 'transparent',
    style: {
      transform: 'none',
    },
  })
  .then((dataUrl) => {
    stripWrapper.style.transform = originalTransform;

    const link = document.createElement('a');
    link.download = `PhotoShot_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  })
  .catch((err) => {
    console.error('Download failed:', err);
    stripWrapper.style.transform = originalTransform;
  });
};


  return (
    <div className="customization-page">
      <div className="custom-left ">
        <div
          className={`photo-strip-wrapper theme-${theme} layout-${layout}`}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '6px',
            width: columns === 1 ? '250px' : `${columns * 120}px`,
            ...currentBackground,
          }}
        >
          {photos.map((src, i) => (
            <div key={i} className="photo-frame">
              <img
                src={src}
                alt={`photo-${i}`}
                className="photo-image"
                style={{ filter: currentFilterStyle }}
              />
            </div>
          ))}
          <div
            className={`timestamp ${isDarkTheme ? 'dark' : 'light'}`}
            style={{ gridColumn: `span ${columns}` }}
          >
            PhotoShot {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      <div className="controls-panel">
        <h3>Customize your photo strip</h3>

        <div className="right-buttons">
          <button className="custom-button" onClick={handleDownload}>Download</button>
          <button className="custom-button" onClick={() => navigate('/layout-select')}>Take New Photos</button>
        </div>

        <div className="section">
          <h4>Frame colour / Theme</h4>
          <div className="color-options">
            {Object.keys(themeBackgrounds).map((color) => (
              <button
                key={color}
                className={`custom-button ${theme === color ? 'active' : ''}`}
                onClick={() => setTheme(color)}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <h4>Photo filter</h4>
          <div className="filter-options">
            {filterOptions.map(({ name }) => (
              <button
                key={name}
                className={`custom-button ${selectedFilter === name ? 'active' : ''}`}
                onClick={() => setSelectedFilter(name)}
                title={name}
              >
                {name.split('–')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;
