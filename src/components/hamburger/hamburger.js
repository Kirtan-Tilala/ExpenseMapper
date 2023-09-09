import React, { useState } from 'react';

const Hamburger = () => {
  const [rectangle1Width, setRectangle1Width] = useState(60);
  const [rectangle2Width, setRectangle2Width] = useState(60);
  const [rectangle3Width, setRectangle3Width] = useState(60);

  const toggleRectangle1Width = () => {
    setRectangle1Width(prevWidth => (prevWidth === 60 ? 70 : 60));
  };

  const toggleRectangle2Width = () => {
    setRectangle2Width(prevWidth => (prevWidth === 60 ? 70 : 60));
  };

  const toggleRectangle3Width = () => {
    setRectangle3Width(prevWidth => (prevWidth === 60 ? 70 : 60));
  };

  return (
    <svg width="100" height="50" viewBox="-20 -20 45 100">
      <rect
        width={rectangle1Width}
        height="10"
        rx="5"
        x="10"
        y="10"
        fill="#574c4c"
        onClick={toggleRectangle1Width}
      />
      <rect
        width={rectangle2Width}
        height="10"
        rx="5"
        x="10"
        y="30"
        fill="#574c4c"
        onClick={toggleRectangle2Width}
      />
      <rect
        width={rectangle3Width}
        height="10"
        rx="5"
        x="10"
        y="50"
        fill="#574c4c"
        onClick={toggleRectangle3Width}
      />
    </svg>
  );
};

export default Hamburger;
