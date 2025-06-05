import React from 'react';
import '../components/styles/AccuracyBar.css';

const AccuracyBar = ({ confidence }) => {
  return (
    <div className="accuracy-bar">
      <label>Confidence: {confidence}%</label>
      <div className="bar-container">
        <div
          className="bar-fill"
          style={{ width: `${confidence * 100 }%` }}
        />
      </div>
    </div>
  );
};

export default AccuracyBar;
