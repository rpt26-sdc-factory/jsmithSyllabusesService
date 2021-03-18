import React from 'react';
import Videos from './Videos.jsx';
import Readings from './Readings.jsx';
import Exercises from './Exercises.jsx';

//renders a lesson's title, description, videos, readings, and exercises.
const Lesson = (props) => {
  let videosText = props.lessonData.videos.length === 1 ? 'video' : 'videos';
  let readingsText = props.lessonData.readings.length === 1 ? 'reading' : 'readings';
  let exercisesText = props.lessonData.exercises.length === 1 ? 'quiz' : 'quizzes';
  let seeAllId = 'lesson'.concat(props.lessonNumber);
  let seeAllButtonId = seeAllId.concat('button');
  let buttonText = 'SEE ALL';

  //shows/hides Videos, Readings, Exercises
  let seeAllClickHandler = () => {
    let elem = document.getElementById(seeAllId);
    elem.style.display = elem.style.display === 'block' ? 'none' : 'block';
    buttonText = buttonText === 'SEE ALL' ? 'SEE LESS' : 'SEE ALL';
    let seeAllButtonElem = document.getElementById(seeAllButtonId);
    seeAllButtonElem.innerHTML = seeAllButtonElem.innerHTML === 'SEE ALL' ? 'SEE LESS' : 'SEE ALL';
  };

  return (
    <div className="lesson">
      <div className="lesson-hours">
        <div className="orange-circle">
          <div className="lesson-hours-clock">
            <svg viewBox="0 0 48 48" className="circle-svg">
              <path d={props.svgsData.hoursSVG}></path>
            </svg>
          </div>
        </div>
        <div className="lesson-hours-text">
          {`${props.lessonData.hoursToCompleteLesson} hours to complete`}
        </div>
      </div>
      <div className="lesson-name">
        {props.lessonData.lessonTitle}
      </div>
      <div className="lesson-description">
        {props.lessonData.lessonDescription}
      </div>
      <div className="lesson-materials">
        <div className="blue-circle">
          <svg viewBox="0 0 48 48" className="circle-svg">
            <path d={props.svgsData.readingsSVG}></path>
          </svg>
        </div>
        <div className="lesson-materials-text">
          {`${props.lessonData.videos.length} ${videosText} (Total ${props.lessonData.videosLength} min), ${props.lessonData.readings.length} ${readingsText} ${props.lessonData.exercises.length} ${exercisesText}`}
        </div>
        <button className="see-all-button" id={seeAllButtonId} onClick={seeAllClickHandler}>{buttonText}</button>
      </div>
      <hr className="divider" />
      <div id={seeAllId} className="hidden">
        <Videos videosData={props.lessonData.videos} svgsData={props.svgsData} videosText={videosText} lessonNumber={props.lessonNumber} />
        <Readings readingsData={props.lessonData.readings} svgsData={props.svgsData} readingsText={readingsText} lessonNumber={props.lessonNumber} />
        <Exercises exercisesData={props.lessonData.exercises} svgsData={props.svgsData} exercisesText={exercisesText} lessonNumber={props.lessonNumber} />
      </div>
    </div >
  );
};

export default Lesson;