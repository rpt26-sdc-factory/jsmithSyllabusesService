import React from "react";

//render example: Welcome to Machine Learning! 1m
const Video = (props) => {
  return (
    <div className="video">
      {`${props.video.title} ${props.video.videoLengthMinutes}m`}
    </div>
  );
};

export default Video;