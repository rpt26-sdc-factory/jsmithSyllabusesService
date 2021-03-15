import React from 'react';
import Lesson from './Lesson.jsx';

// renders week number and all lessons for a week
const Week = (props) => {
  // console.log('props.weekData: ', props.weekData);


  // let weekData = Array.isArray(props.weekData) ? props.weekData : [];
  // console.log('weekData: ', weekData);

  return (
    <div className="week">
      <div className="week-title">

        <div className="week-literal">
        WEEK
        </div>
        <br />
        <div className="week-number week-literal">
          {props.weekData.weekNumber}
        </div>
      </div>
      <div className="lessons">
        {props.weekData.lessons.map((lesson, index) => {
          return <Lesson svgsData={props.svgsData} lessonData={lesson} key={'lessons'.concat(props.weekNumber, index)} lessonNumber={index + 1}/>;
        })}
      </div>
    </div >
  );
};

export default Week;