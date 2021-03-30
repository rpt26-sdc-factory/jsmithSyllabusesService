import React from 'react';
import Week from './Week.jsx';

//renders all weeks
const Weeks = (props) => (
  <div className="weeks">
    {props.syllabusData.weeks.map((week, index) => (
      <Week svgsData={props.svgsData} weekData={props.syllabusData.weeks[index]} key={'week'.concat(index)} weekNumber={index + 1} />
    ))}
  </div>
);

export default Weeks;