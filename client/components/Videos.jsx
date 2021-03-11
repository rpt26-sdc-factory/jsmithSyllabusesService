import React from "react";
import Video from 'Video';

//render example: 5 videos
const Videos = (props) => {
  return (
    <div className="videos">
      <div className="videos-svg">
        <svg viewBox="0 0 48 48">
          <path d={props.svgsData.videosSVG}></path>
        </svg>
        {`${props.videosData.length} ${props.videosText}`}
      </div>
      {props.videosData.map((video, index) => {
        return <Video videoData={video} key={'video'.concat(props.lessonNumber), index} />
      })}
    <hr>
    </div>
  );
};

export default Videos;



</div >
  <div className="lesson-materials-readings-svg">
    <svg viewBox="0 0 48 48">
      <path d={props.svgsData.videosSVG}></path>
    </svg>
  </div>