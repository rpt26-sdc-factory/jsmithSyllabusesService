import React, { useState, useEffect } from "react";
import Weeks from 'Weeks';

//renders a syllabus for a course
const Syllabus = () => {
  const syllabusPort = 3005;
  const imagesPort = 3006;
  const reviewsPort = 3007;
  let courseNumber = window.location.href.pathname.split('/')[1];
  let positive = '%';
  const [syllabusData, setSyllabusData] = useState(null);
  const [svgsData, setSvgsData] = useState(null);
  const [positiveReviews, setPositiveReviews] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:${syllabusPort}/api/${courseNumber}`)
      .then((responseData) => {
        setSyllabusData(responseData);
      })
      .catch((err) => {
        if (err) {
          console.error('Error in GET syllabus', err);
        }
      });

    fetch(`http://localhost:${imagesPort}/api/svgs`)
      .then((responseData) => {
        setSvgsData(responseData);
      })
      .then(() => {
        setThumbSVG(svgsData.thumbSVG);
        setHoursSVG(svgsData.hoursSVG);
        setReadingsSVG(svgsData.readingsSVG);
        setVideosSVG(svgsData.videosSVG);
        setExercisesSVG(svgsData.exercisesSVG);
      })
      .catch((err) => {
        if (err) {
          console.error('Error in GET svgs', err);
        }
      });

    fetch(`http://localhost:${reviewsPort}/api/starReviews/:${courseNumber}`)
      .then((responseData) => {
        setTotalReviewScore(responseData);
        let fiveStar = parseInt(responseData.fiveStar.slice('%')[0]);
        let fourStar = parseInt(responseData.fourStart.slice('%')[0]);
        let percentage = fiveStar + fourStar;
        positive = percentage.toString().concat(positive);
        setPositiveReviews(positive);
      })
      .catch((err) => {
        if (err) {
          console.error('Error in GET starReviews', err)
        }
      });
  }, []);

  return (
    <div className="syllabus">
      <div className="syllabus-title">
        {"Syllabus - What you will learn from this course"}
        <span className="rating">
          {"Content Rating"}
          <span className="rating-thumb"></span>
          <svg>
            <path d={svgsData.thumbSVG}>
            </svg>
            <span className="rating-percentage">{positiveReviews}</span>
            <span className="rating-number">{`(${totalReviewScore.reviewCount} ratings)`}</span>
            <span className="rating-info">
              <svg>
                <path d={svgsData.info.i}></path>
                <path d={svgsData.info.dot}></path>
                <polygon points={svgsData.info.circle}></polygon>
              </svg>
            </span>
          </span>
        </span>
      </div>
      <div className="syllabus-week">
        <Weeks svgsData={svgsData} syllabusData={syllabusData} />
      </div>
    </div>
  );
};

export default Syllabus;