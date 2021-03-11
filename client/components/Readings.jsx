import React from "react";
import Reading from 'Reading';

const Readings = (props) => {
  return (
    <div className="readings">
      <div className="readings-svg">
        <svg viewBox="0 0 48 48">
          <path d={props.svgsData.readingsSVG}></path>
        </svg>
        {`${props.readingsData.length} ${props.readingsText}`}
      </div>
      {props.readingsData.map((reading, index) => {
        return <reading readingData={reading} key={'reading'.concat(props.lessonNumber), index} />
      })}
      <hr>
    </div>
  );
}

export default Readings;