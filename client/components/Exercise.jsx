import React from 'react';

//render example: Octave/Matlab Tutorial 30m
const Exercise = (props) => {
  return (
    <div className="exercise svg">
      {`${props.exerciseData.exerciseTitle} ${props.exerciseData.exerciseLengthMinutes}m`}
    </div>
  );
};

export default Exercise;