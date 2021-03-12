import React from "react";
import Week from 'Week';

//renders all weeks
const Weeks = (props) => {
  return (
    <div className="weeks">
      {props.weeks.map((week, index) => {
        return <Week svgsData={props.svgsData} weekData={props.syllabusData.weeks[index]} key={'week'.concat(index)} weekNumber={index + 1} />
      })}
    </div>
  );
};

export default Weeks;