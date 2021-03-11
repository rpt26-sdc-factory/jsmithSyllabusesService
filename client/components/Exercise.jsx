import React, { useState, useEffect } from "react";

const Exercise = (props) => {
  return (
    <div className="exercise">
      {`${props.exercise.title} ${props.exercise.exerciseLengthMinutes}m`}
    </div>
  );
};

export default Exercise;