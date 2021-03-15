import React from 'react';
import Video from './Video.jsx';

//render example: 5 videos
const Videos = (props) => {
  return (
    <div className="videos">
      <div className="videos-count">
        <div className="videos-svg plain-svg">
          <svg viewBox="0 0 48 48">
            <path d={props.svgsData.videosSVG}></path>
          </svg>
        </div>
        <div className="videos-count-text">
          {`${props.videosData.length} ${props.videosText}`}
        </div>
      </div>
      {props.videosData.map((video, index) => {
        return <Video videoData={video} key={'video'.concat(props.lessonNumber), index} />;
      })}
      <hr />
    </div>
  );
};

export default Videos;