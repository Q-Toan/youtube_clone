import React from 'react';
import './ShowMoreButton.css';

const ShowMoreButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="show-more-btn">
      {children}
    </button>
  );
};

export default ShowMoreButton;
