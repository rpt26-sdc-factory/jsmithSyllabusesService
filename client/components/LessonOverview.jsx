import React from 'react';

const LessonOverview = (props) => (
  <div className="lesson-materials">
    <div className="blue-circle">
      <svg viewBox="0 0 48 48" className="circle-svg">
        <path d={props.readingsSVG}></path>
      </svg>
    </div>
    <div className="lesson-materials-text">
      {`${props.lessonData.videos.length} ${props.videosText} (Total ${props.lessonData.videosLength} min), ${props.lessonData.readings.length} ${props.readingsText} ${props.lessonData.exercises.length} ${props.exercisesText}`}
    </div>
    <button className="see-all-button" id={props.seeAllButtonId} onClick={props.seeAllClickHandler}>{props.buttonText}</button>
  </div>
);

export default LessonOverview;