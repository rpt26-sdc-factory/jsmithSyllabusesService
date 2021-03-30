import React from 'react';
import Rating from './Rating.jsx';

//render example: 'Syllabus - What you will learn from this course...'
const Header = (props) => (
  <div className="syllabus-title">
    {'Syllabus - What you will learn from this course'}
    <br />
    <Rating svgsData={props.svgsData} reviewCount={props.reviewCount} positiveReviews={props.positiveReviews} />
  </div>
);

export default Header;