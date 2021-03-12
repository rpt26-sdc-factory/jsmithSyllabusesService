import React from "react";
import Exercise from 'Exercise';

//render example: 1 practice quiz
const Exercises = (props) => {
  return (
    <div className="exercises">
      <div className="exercises-svg">
        <svg viewBox="0 0 48 48">
          <path d={props.svgsData.exercisesSVG}></path>
        </svg>
        {`${props.exercisesData.length} practice ${props.exercisesText}`}
      </div>
      {props.exercisesData.map((exercise, index) => {
        return <exercise exerciseData={exercise} key={'exercise'.concat(props.lessonNumber, index)} />
      })}
      <hr>
    </div>
  );
}

export default Exercises;