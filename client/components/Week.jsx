import React from 'react';
import Lesson from './Lesson.jsx';
import WeekTitle from './WeekTitle.jsx';

// renders week number and all lessons for a week
const Week = (props) => (
  <div className="week">
    <WeekTitle weekNumber={props.weekData.weekNumber} />
    <div className="lessons">
      {props.weekData.lessons.map((lesson, index) => (
        <Lesson svgsData={props.svgsData} lessonData={lesson} key={'lessons'.concat(props.weekNumber, index)} lessonNumber={index + 1}/>
      ))}
    </div>
  </div >
);


export default Week;