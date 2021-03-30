import React from 'react';

const Rating = (props) => (
  <span className="rating">
    {'Content Rating'}
    <svg className="rating-thumb rating-svg" viewBox="0 0 48 48" ><title>Thumbs Up</title>
      <path d={props.svgsData.thumbSVG}></path>
    </svg>
    {props.positiveReviews}
    {`(${props.reviewCount} ratings)`}
    <svg className="rating-info rating-svg" viewBox="0 0 48 48" ><title>Info</title>
      <path d={props.svgsData.infoSVG.i}></path>
      <path d={props.svgsData.infoSVG.dot}></path>
      <polygon points={props.svgsData.infoSVG.circle}></polygon>
    </svg>
  </span>
);

export default Rating;