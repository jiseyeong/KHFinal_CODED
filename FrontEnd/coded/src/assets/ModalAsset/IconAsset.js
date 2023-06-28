import React from 'react';

const CloseBtn = ({ onClick, customStyle }) => {
  return (
    <svg
      id="Icons"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="closeBtn"
      onClick={onClick}
      style={customStyle}
    >
      <path
        className="cls-1"
        d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"
      />
      <path
        className="cls-1"
        d="M16.707,7.293a1,1,0,0,0-1.414,0L12,10.586,8.707,7.293A1,1,0,1,0,7.293,8.707L10.586,12,7.293,15.293a1,1,0,1,0,1.414,1.414L12,13.414l3.293,3.293a1,1,0,0,0,1.414-1.414L13.414,12l3.293-3.293A1,1,0,0,0,16.707,7.293Z"
      />
    </svg>
  );
};

const Rain = ({ className, onClick }) => {
  return (
    <svg
      id="icon"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path d="M23.5,22H8.5A6.5,6.5,0,0,1,7.2,9.14a9,9,0,0,1,17.6,0A6.5,6.5,0,0,1,23.5,22ZM16,4a7,7,0,0,0-6.94,6.14L9,11,8.14,11a4.5,4.5,0,0,0,.36,9h15a4.5,4.5,0,0,0,.36-9L23,11l-.1-.82A7,7,0,0,0,16,4Z" />
      <path d="M14,30a.93.93,0,0,1-.45-.11,1,1,0,0,1-.44-1.34l2-4a1,1,0,1,1,1.78.9l-2,4A1,1,0,0,1,14,30Z" />
      <path d="M20,30a.93.93,0,0,1-.45-.11,1,1,0,0,1-.44-1.34l2-4a1,1,0,1,1,1.78.9l-2,4A1,1,0,0,1,20,30Z" />
      <path d="M8,30a.93.93,0,0,1-.45-.11,1,1,0,0,1-.44-1.34l2-4a1,1,0,1,1,1.78.9l-2,4A1,1,0,0,1,8,30Z" />
    </svg>
  );
};

export { CloseBtn, Rain };
