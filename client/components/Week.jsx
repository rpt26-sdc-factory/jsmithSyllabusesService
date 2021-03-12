import React from "react";
import Lesson from 'Lesson';

// renders week number and all lessons for a week
const Week = (props) => {
  return (
    <div className="week">
      <div className="week-literal">
        WEEK
      </div>
      <div className="week-number">
        {props.weekData.weekNumber}
      </div>
      <div className="lessons">
        {props.weekData.map((lesson, index) => {
          return <Lessons svgsData={props.svgsData} lessonsData={lesson} key={'lessons'.concat(props.weekNumber, index)} lessonNumber={index + 1}/>;
        })}
    </div>
    </div >
  );
};

export default Week;