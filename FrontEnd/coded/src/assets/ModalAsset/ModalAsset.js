import React from 'react';

const OptionBox = () => {
  return (
    <svg
      className="option"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M255.8 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM102 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM410 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38z"></path>
    </svg>
  );
};

const Like = (handleClickLike) => {
  return (
    <svg
      className="like"
      // onClick={handleClickLike}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const ScrapImage = () => {
  return (
    <svg
      height="26"
      viewBox="0 0 20 20"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4.5C4 3.11929 5.11929 2 6.5 2H13.5C14.8807 2 16 3.11929 16 4.5V17.5C16 17.6881 15.8945 17.8602 15.7269 17.9456C15.5593 18.0309 15.358 18.015 15.2059 17.9044L10 14.1183L4.79409 17.9044C4.64199 18.015 4.4407 18.0309 4.27311 17.9456C4.10553 17.8602 4 17.6881 4 17.5V4.5Z"
        fill="currentColor"
      />
    </svg>
  )
};

const RepleImage = () => {
  return (
    <svg
      className="repleLike"
      onClick={handleRepleLike}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const Temperature = () => {
  return (
    <svg
      height="32px"
      version="1.1"
      viewBox="0 0 32 32"
      width="32px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />
      <desc />
      <defs />
      <g
        fill="none"
        fillRule="evenodd"
        id="Thermometer-Hot"
        stroke="none"
        strokeWidth="1"
      >
        <g
          id="Group"
          stroke="#979797"
          strokeWidth="2"
          transform="translate(7.000000, 2.000000)"
        >
          <path
            d="M3,16.8026932 L3,3 C3,1.34314575 4.34314575,3.04359188e-16 6,0 C7.65685425,-3.04359188e-16 9,1.34314575 9,3 L9,16.8026932 C10.7934041,17.8401214 12,19.7791529 12,22 C12,25.3137085 9.3137085,28 6,28 C2.6862915,28 0,25.3137085 0,22 C0,19.7791529 1.20659589,17.8401214 3,16.8026932 Z"
            id="Combined-Shape"
          />
          <path d="M13,5 L18,5" id="Path-19" strokeLinecap="round" />
          <path d="M13,9 L18,9" id="Path-20" strokeLinecap="round" />
          <path d="M13,13 L18,13" id="Path-21" strokeLinecap="round" />
        </g>
        <g
          fill="#CCCCCC"
          id="Group-2"
          transform="translate(10.000000, 12.000000)"
        >
          <circle cx="3" cy="12" id="Oval" r="3" />
          <rect height="11" id="Rectangle-2" rx="1" width="2" x="2" y="0" />
        </g>
      </g>
    </svg>
  );
};

const ModalAsset = () => {
  return <div></div>;
  l;
};

export default ModalAsset;
export { OptionBox, Like, ScrapImage, RepleImage, Temperature };
