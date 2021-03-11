import React, { useState, useEffect } from "react";
import Exercise from 'Exercise';

const Exercises = (props) => {
  return (
    <div className="exercises">
      <div className="exercises-svg">
        <svg viewBox="0 0 48 48">
          <path d={props.svgsData.exercisesSVG}></path>
        </svg>
        {`${props.exercisesData.length} ${props.exercisesText}`}
      </div>
      {props.exercisesData.map((exercise, index) => {
        return <exercise exerciseData={exercise} key={'exercise'.concat(props.lessonNumber), index} />
      })}
      <hr>
    </div>
  );
}

export default Exercises;