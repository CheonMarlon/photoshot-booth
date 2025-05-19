import React from 'react';
import './LayoutSelect.css';

const LayoutSelect = () => {
  return (
    <div className="layout-main">
        <div className="layout-modal-overlay">
            <div className="layout-modal-container">
                <div className="layout-title">
                <h1>Choose your layout</h1>
                <p>Pick a layout that suits your style!</p>
                </div>

                <div className="layout-btn-container">
                <button className="photo-strip-btn photo-strip-4x1">
                    <span className="cell"></span>
                    <span className="cell"></span>
                    <span className="cell"></span>
                    <span className="cell"></span>
                </button>

                <button className="photo-strip-btn photo-strip-2x2">
                    <span className="cell"></span>
                    <span className="cell"></span>
                    <span className="cell"></span>
                    <span className="cell"></span>
                </button>

                <button className="photo-strip-btn photo-strip-3x2">
                    <span className="cell"></span>
                    <span className="cell"></span>
                    <span className="cell"></span>
                    <span className="cell"></span>
                    <span className="cell"></span>
                    <span className="cell"></span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSelect;
