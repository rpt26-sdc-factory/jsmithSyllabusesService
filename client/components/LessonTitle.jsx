import React from 'react';

const LessonTitle = (props) => (
  <div>
    <div className="lesson-name">
      {props.lessonTitle}
    </div>
    <div className="lesson-description">
      {props.lessonDescription}
    </div>
  </div>
);

export default LessonTitle;