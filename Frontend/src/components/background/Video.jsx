import React from 'react';
import video from "../../../public/SnapSave.io-Black live Wallpaper 1080p-(1080p).mp4"
const BackgroundVideo = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className=" absolute top-0 left-0 w-full h-full object-cover"
        >
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      
    </div>
  );
};

export default BackgroundVideo;
