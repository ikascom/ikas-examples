import React from "react";

const svg = (props: JSX.IntrinsicElements["svg"]) => (
  <svg
    focusable="false"
    className="animate-spin"
    role="presentation"
    width="20"
    height="20"
    viewBox="0 0 26 26"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fillRule="nonzero" fill="currentColor">
      <path
        d="M13 26C5.82 26 0 20.18 0 13S5.82 0 13 0s13 5.82 13 13-5.82 13-13 13zm0-3.852a9.148 9.148 0 1 0 0-18.296 9.148 9.148 0 0 0 0 18.296z"
        opacity=".29"
      ></path>
      <path d="M13 26c7.18 0 13-5.82 13-13a1.926 1.926 0 0 0-3.852 0A9.148 9.148 0 0 1 13 22.148 1.926 1.926 0 0 0 13 26z"></path>
    </g>
  </svg>
);

export default svg;
