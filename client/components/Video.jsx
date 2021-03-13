import React from 'react';

//render example: Welcome to Machine Learning! 1m
const Video = (props) => {
  return (
    <div className="video">
      {`${props.videoData.videoTitle} ${props.videoData.videoLengthMinutes}m`}
    </div>
  );
};

export default Video;