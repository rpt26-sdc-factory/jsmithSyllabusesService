import React from 'react';

//render example: Welcome to Machine Learning! 1m
const Reading = (props) => {
  return (
    <div className="reading">
      {`${props.readingData.readingTitle} ${props.readingData.readingLengthMinutes}m`}
    </div>
  );
};

export default Reading;