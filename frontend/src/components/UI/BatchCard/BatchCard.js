import React from 'react';
import './BatchCard.css';

const BatchCard = (props) => {
 return <div className="card">
    <div className="card-body">
      <h5 className="card-title">B.Tech-{props.year}</h5>
      <h6 className="card-subtitle mb-2 text-muted">CS, IT, CE, ETC, EEE</h6>
      <p
        onClick={() => props.function(props.year)}
        className="card-text"
        style={{
          cursor: 'pointer',
          color: '#00a4eb',
        }}
      >
        Add or Check Info
      </p>
    </div>
  </div>;
};

export default BatchCard;
