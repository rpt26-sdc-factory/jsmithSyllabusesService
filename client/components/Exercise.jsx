import React from "react";

//render example: Octave/Matlab Tutorial 30m
const Exercise = (props) => {
  return (
    <div className="exercise">
      {`${props.exercise.title} ${props.exercise.exerciseLengthMinutes}m`}
    </div>
  );
};

export default Exercise;