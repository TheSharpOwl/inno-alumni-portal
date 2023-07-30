import React from "react";

const Avatar = ({ src, alt, size = 64 }) => {
  return (
    <div className={`w-${size} h-${size} overflow-hidden rounded-full`}>
      <img className="w-full h-full object-cover" src={src} alt={alt} />
    </div>
  );
};

export default Avatar;