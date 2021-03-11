import React, { useState, useEffect } from "react";
import Videos from 'Videos';
import Readings from 'Readings';
import Exercises from 'Exercises';

const Lesson = (props) => {
  let videosText = props.lesson.videos.length === 1 ? 'video' : 'videos';
  let readingsText = props.lesson.readings.length === 1 ? 'reading' : 'readings';
  let exercisesText = props.lesson.exercises.length === 1 ? 'quiz' : 'quizzes';
  let seeAllId = "lesson".concat(props.lessonNumber);

  let seeAllClickHandler = () => {
    let elem = document.getElementById(seeAllId);
    elem.style.display = elem.style.display === 'none' ? 'block' : 'none';
  };

  return (
    <div className="lesson">
      <div className="lesson-hours">
        <div className="lesson-hours-clock">
          <svg viewBox="0 0 48 48">
            <path d={props.svgsData.hoursSVG}></path>
          </svg>
        </div>
      </div>
      <div className="lesson-name">
        {props.lesson.lessonTitle}
      </div>
      <div className="lesson-description">
        {props.lesson.lessonDescription}
      </div>
      <div className="lesson-materials">
        <div className="lesson-materials-readings-svg">
          <svg viewBox="0 0 48 48">
            <path d={props.svgsData.readingsSVG}></path>
          </svg>
          {`${lesson.videos.length} ${videosText} (Total ${lesson.videosLength} min), ${lesson.readings.length} ${readingsText} ${lesson.exercises.length} ${exercisesText}`}
          <button className="lesson-see-all" onClick={seeAllClickHandler}></button>
        </div>
        <div id={seeAllId}>
          <Videos videosData={props.lesson.videos} svgsData={props.svgsData} videosText={videosText} lessonNumber={props.lessonNumber} />
          <Readings readingsData={props.lesson.readings} svgsData={props.svgsData} readingsText={readingsText} lessonNumber={props.lessonNumber} />
          <Exercises exercisesData={props.lesson.exercises} svgsData={props.svgsData} exercisesText={exercisesText} lessonNumber={props.lessonNumber} />
        </div>
      </div>
    </div >
  );
};

export default Lesson;