import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import './Camera.css';  

const layoutToCount = { '4x1': 4, '2x2': 4, '3x2': 6 };
const PHOTO_INTERVAL = 3000; // 3 seconds

const Camera = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const layout = location.state?.layout;
  const count = layoutToCount[layout] || 4;

  const webcamRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [takingPhotos, setTakingPhotos] = useState(false);
  const [timer, setTimer] = useState(PHOTO_INTERVAL / 1000);

  useEffect(() => {
    if (!layout) {
      navigate('/'); // no layout, redirect home
      return;
    }
    setTakingPhotos(true);
  }, [layout, navigate]);

  useEffect(() => {
    if (!takingPhotos) return;

    if (photos.length === count) {
      setTakingPhotos(false);
      navigate('/customize', { state: { layout, photos } });
      return;
    }

    const countdownInterval = setInterval(() => {
      setTimer((prev) => (prev > 1 ? prev - 1 : PHOTO_INTERVAL / 1000));
    }, 1000);

    // Take photo after 3 seconds
    const takePhotoTimeout = setTimeout(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) setPhotos((prev) => [...prev, imageSrc]);
      setTimer(PHOTO_INTERVAL / 1000);
    }, PHOTO_INTERVAL);

    return () => {
      clearTimeout(takePhotoTimeout);
      clearInterval(countdownInterval);
    };
  }, [photos, takingPhotos, count, navigate, layout]);

  if (!layout) return null;

  return (
    <div className="camera-container">
      {/* Left side: Webcam and Timer */}
      <div className="camera-left">
        <h2>Taking {count} photos every 3 seconds...</h2>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={{ facingMode: 'user' }}
          className="camera-webcam"
        />
        <p className="camera-timer">
          Next photo in: <strong>{timer}</strong> second{timer !== 1 ? 's' : ''}
        </p>
        <p>
          Photo {photos.length + 1} of {count}
        </p>
      </div>

      {/* Right side: Thumbnails */}
      <div className="camera-right">
        <h3>Taken Photos</h3>
        {photos.length === 0 && <p>No photos yet</p>}
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`photo-${i}`}
            className="camera-thumbnail"
          />
        ))}
      </div>
    </div>
  );
};

export default Camera;
