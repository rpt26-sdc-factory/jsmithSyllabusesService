import React from 'react';
import Exercise from './Exercise.jsx';

//render example: 1 practice quiz
const Exercises = (props) => (
  <div className="exercises">
    <div className="exercises-svg svg">
      <svg viewBox="0 0 48 48">
        <path d={props.svgsData.exercisesSVG}></path>
      </svg>
      {`${props.exercisesData.length} practice ${props.exercisesText}`}
    </div>
    {props.exercisesData.map((exercise, index) => {
      return <Exercise exerciseData={exercise} key={'exercise'.concat(props.lessonNumber, index)} />;
    })}
    <hr></hr>
  </div>
);


export default Exercises;