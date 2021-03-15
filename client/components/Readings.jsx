import React from 'react';
import Reading from './Reading.jsx';

//render example: 9 readings
const Readings = (props) => {
  return (
    <div className="readings">
      <div className="readings-count">

        <div className="readings-svg plain-svg">
          <svg viewBox="0 0 48 48">
            <path d={props.svgsData.readingsSVG}></path>
          </svg>
        </div>
        <div className="readings-count-text">
          {`${props.readingsData.length} ${props.readingsText}`}

        </div>
      </div>
      {props.readingsData.map((reading, index) => {
        return <Reading readingData={reading} key={'reading'.concat(props.lessonNumber), index} />;
      })}
      <hr />
    </div>
  );
};

export default Readings;


// return (
//   <div className="readings">
//     <div className="readings-svg svg">
//       <svg viewBox="0 0 48 48">
//         <path d={props.svgsData.readingsSVG}></path>
//       </svg>
//       {`${props.readingsData.length} ${props.readingsText}`}
//     </div>
//     {props.readingsData.map((reading, index) => {
//       return <Reading readingData={reading} key={'reading'.concat(props.lessonNumber), index} />;
//     })}
//     <hr />
//   </div>
// );