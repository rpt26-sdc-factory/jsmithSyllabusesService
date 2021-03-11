import React from "react";

const Video = (props) => {
  return (
    <div className="video">
      {`${props.video.title} ${props.video.videoLengthMinutes}m`}
    </div>
  );
};

export default Video;