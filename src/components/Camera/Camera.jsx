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
  const [showGetReady, setShowGetReady] = useState(true);

  useEffect(() => {
    if (!layout) {
      navigate('/');
      return;
    }


    setTimeout(() => {
      setShowGetReady(false);
      setTakingPhotos(true);
    }, 2500); 
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

        {/* Webcam & Overlay Timer */}
        <div className="camera-webcam-wrapper">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'user' }}
            className="camera-webcam"
          />
          <div className="camera-overlay-number">
            {showGetReady ? (
              <span className="camera-get-ready">Get Ready...</span>
            ) : (
              takingPhotos && (
                <span key={timer} className="camera-overlay-timer">
                  {timer}
                </span>
              )
            )}
          </div>
        </div>
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
