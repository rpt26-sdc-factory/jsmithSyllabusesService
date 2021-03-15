import React from 'react';
import Exercise from './Exercise.jsx';

//render example: 1 practice quiz
const Exercises = (props) => (
  <div className="exercises">
    <div className="exercises-count">

      <div className="exercises-svg plain-svg">
        <svg viewBox="0 0 48 48">
          <path d={props.svgsData.exercisesSVG}></path>
        </svg>
      </div>
      <div className="exercises-count-text">
        {`${props.exercisesData.length} ${props.exercisesText}`}

      </div>
    </div>
    {props.exercisesData.map((exercise, index) => {
      return <Exercise exerciseData={exercise} key={'exercise'.concat(props.lessonNumber), index} />;
    })}
    <hr />
  </div>

);


export default Exercises;


// <div className="exercises">
// <div className="exercises-svg svg">
//   <svg viewBox="0 0 48 48">
//     <path d={props.svgsData.exercisesSVG}></path>
//   </svg>
//   {`${props.exercisesData.length} practice ${props.exercisesText}`}
// </div>
// {props.exercisesData.map((exercise, index) => {
//   return <Exercise exerciseData={exercise} key={'exercise'.concat(props.lessonNumber, index)} />;
// })}
// <hr />
// </div>