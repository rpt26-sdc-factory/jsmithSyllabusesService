import React from 'react';

const WeekTitle = (props) => (
  <div className="week-title">
    <div className="week-literal"> WEEK </div>
    <br />
    <div className="week-number week-literal"> {props.weekNumber} </div>
  </div>
);

export default WeekTitle;