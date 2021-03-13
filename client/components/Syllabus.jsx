import React from 'react';
import Weeks from './Weeks.jsx';
import state from './initial/state.js';

//renders a syllabus for a course
class Syllabus extends React.Component {
  constructor(props) {
    super(props);
    this.state = state;
    this.syllabusController = new AbortController();
    this.imagesController = new AbortController();

  }

  //sets initial state, then sets courseNumber from window, then fetches data
  componentDidMount() {

    this.setState({courseNumber: window.location.pathname.split('/')[1]}, () => {
      const syllabusOptions = {
        signal: this.syllabusController.signal,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(`http://localhost:${this.state.syllabusPort}/api/syllabus/${this.state.courseNumber}`, syllabusOptions)
        .then((responseData) => {
          return responseData.json();
        })
        .then((responseJSON) => {
          this.setState({ syllabusData: responseJSON }, () => {
          });
        })
        .catch((err) => {
          if (err && err.message !== 'The user aborted a request.') {
            console.error('Error in GET syllabus', err);
          }
        });

      const imagesOptions = {
        mode: 'cors',
        signal: this.imagesController.signal,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(`http://localhost:${this.state.imagesPort}/api/svgs`, imagesOptions)
        .then((responseData) => {
          return responseData.json();
        })
        .then((responseJSON) => {
          this.setState({ svgsData: responseJSON });
        })
        .catch((err) => {
          if (err) {
            console.error('Error in GET svgs', err);
          }
        });
    });


    //uncomment if running reviews server
    // fetch(`http://localhost:${reviewsPort}/api/starReviews/:${courseNumber}`)
    //   .then((responseData) => {
    //     setTotalReviewScore(responseData);
    //     let fiveStar = parseInt(responseData.fiveStar.slice('%')[0]);
    //     let fourStar = parseInt(responseData.fourStart.slice('%')[0]);
    //     let percentage = fiveStar + fourStar;
    //     positive = percentage.toString().concat(positive);
    //     setPositiveReviews(positive);
    //   })
    //   .catch((err) => {
    //     if (err) {
    //       console.error('Error in GET starReviews', err);
    //     }
    //   });

  }

  componentWillUnmount () {
    console.log('unmounting');
    this.syllabusController.abort();
  }

  render() {
    if (this.state.svgsData) {
      return (
        <div className="syllabus">
          <div className="syllabus-title">
            {'Syllabus - What you will learn from this course'}
            <br />
            <span className="rating">
              {'Content Rating'}
              {/* <svg className="rating-thumb"> */}
              <svg className="rating-thumb" viewBox="0 0 48 48" ><title id="ThumbsUp950e403d-06ae-447e-9ee4-e5ace52d6cd2">Thumbs Up</title>
                <path d={this.state.svgsData.thumbSVG}></path>
              </svg>
              <span className="rating-percentage">{this.state.positiveReviews}</span>
              <span className="rating-number">{`(${this.state.reviewCount} ratings)`}</span>
              <span className="rating-info svg">
                <svg className="rating-info"viewBox="0 0 48 48" ><title>Info</title>
                  <path d={this.state.svgsData.infoSVG.i}></path>
                  <path d={this.state.svgsData.infoSVG.dot}></path>
                  <polygon points={this.state.svgsData.infoSVG.circle}></polygon>
                </svg>
              </span>
            </span>
          </div>
          <div className="syllabus-week">
            <Weeks svgsData={this.state.svgsData} syllabusData={this.state.syllabusData} />
          </div>
        </div>
      );
    } else {
      return (
        <div>Fetching Data...</div>
      );
    }
  }
}

export default Syllabus;