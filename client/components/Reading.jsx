import React, { useState, useEffect } from "react";

const Reading = (props) => {
  return (
    <div className="reading">
      {`${props.reading.title} ${props.reading.readingLengthMinutes}m`}
    </div>
  );
};

export default Reading;