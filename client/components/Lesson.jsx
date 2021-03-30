import React, { useState } from 'react';
import Videos from './Videos.jsx';
import Readings from './Readings.jsx';
import Exercises from './Exercises.jsx';
import LessonHeader from './LessonHeader.jsx';
import LessonTitle from './LessonTitle.jsx';
import LessonOverview from './LessonOverview.jsx';

//renders a lesson's title, description, videos, readings, and exercises.
const Lesson = (props) => {
  const [videosText] = useState(props.lessonData.videos.length === 1 ? 'video' : 'videos');
  const [readingsText] = useState(props.lessonData.readings.length === 1 ? 'reading' : 'readings');
  const [exercisesText] = useState(props.lessonData.exercises.length === 1 ? 'quiz' : 'quizzes');
  const [seeAllId] = useState('lesson'.concat(props.lessonNumber));
  const [seeAllButtonId] = useState(seeAllId.concat('button'));
  const [buttonText, setButtonText] = useState('SEE ALL');


  //shows/hides Videos, Readings, Exercises
  const seeAllClickHandler = () => {
    let seeAllNode = document.getElementById(seeAllId);
    seeAllNode.style.display = seeAllNode.style.display === 'block' ? 'none' : 'block';
    if (buttonText === 'SEE ALL') { setButtonText('SEE LESS'); } else { setButtonText('SEE ALL'); }
  };

  return (
    <div className="lesson">
      <LessonHeader hoursSVG={props.svgsData.hoursSVG} hoursToCompleteLesson={props.lessonData.hoursToCompleteLesson} />
      <LessonTitle lessonTitle={props.lessonData.lessonTitle} lessonDescription={props.lessonData.lessonDescription} />
      <LessonOverview readingsSVG={props.svgsData.readingsSVG} lessonData={props.lessonData} videosText={videosText} readingsText={readingsText} exercisesText={exercisesText} seeAllButtonId={seeAllButtonId} seeAllClickHandler={seeAllClickHandler} buttonText={buttonText} />
      <hr className="divider" />
      <div id={seeAllId} className="hidden">
        <Videos videosData={props.lessonData.videos} videosSVG={props.svgsData.videosSVG} videosText={videosText} lessonNumber={props.lessonNumber} />
        <Readings readingsData={props.lessonData.readings} readingsSVG={props.svgsData.readingsSVG} readingsText={readingsText} lessonNumber={props.lessonNumber} />
        <Exercises exercisesData={props.lessonData.exercises} exercisesSVG={props.svgsData.exercisesSVG} exercisesText={exercisesText} lessonNumber={props.lessonNumber} />
      </div>
    </div >
  );
};

export default Lesson;