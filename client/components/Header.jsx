import React from 'react';

//render example: 'Syllabus - What you will learn from this course...'
const Header = (props) => (
  <div className="syllabus-title">
    {'Syllabus - What you will learn from this course'}
    <br />
    <span className="rating">
      {'Content Rating'}
      <svg className="rating-thumb rating-svg" viewBox="0 0 48 48" ><title id="ThumbsUp950e403d-06ae-447e-9ee4-e5ace52d6cd2">Thumbs Up</title>
        <path d={props.svgsData.thumbSVG}></path>
      </svg>
      <span>{props.positiveReviews}</span>
      <span>{`(${props.reviewCount} ratings)`}</span>
      <span>
        <svg className="rating-info rating-svg" viewBox="0 0 48 48" ><title>Info</title>
          <path d={props.svgsData.infoSVG.i}></path>
          <path d={props.svgsData.infoSVG.dot}></path>
          <polygon points={props.svgsData.infoSVG.circle}></polygon>
        </svg>
      </span>
    </span>
  </div>
);

export default Header;