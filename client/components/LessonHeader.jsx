import React from 'react';

const LessonHeader = (props => (
  <div className="lesson-hours">
    <div className="orange-circle">
      <div className="lesson-hours-clock">
        <svg viewBox="0 0 48 48" className="circle-svg">
          <path d={props.hoursSVG}></path>
        </svg>
      </div>
    </div>
    <div className="lesson-hours-text">
      {`${props.hoursToCompleteLesson} hours to complete`}
    </div>
  </div>
));

export default LessonHeader;