import React from "react";
import "./Loader.css"; // Import the CSS for animations

const Loader = () => {
  return (
    <svg className="w-24 h-24" width="240" height="240" viewBox="0 0 240 240">
      <circle
        className="pl__ring pl__ring--a"
        cx="120"
        cy="120"
        r="105"
        fill="none"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <circle
        className="pl__ring pl__ring--b"
        cx="120"
        cy="120"
        r="35"
        fill="none"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <circle
        className="pl__ring pl__ring--c"
        cx="85"
        cy="120"
        r="70"
        fill="none"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <circle
        className="pl__ring pl__ring--d"
        cx="155"
        cy="120"
        r="70"
        fill="none"
        strokeWidth="20"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Loader;
