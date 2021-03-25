import React from 'react';
import Weeks from './Weeks.jsx';
import Header from './Header.jsx';
import state from './initial/state.js';

class Syllabus extends React.Component {
  constructor(props) {
    super(props);
    this.state = state;
    this.syllabusController = new AbortController();
    this.imagesController = new AbortController();
    this.reviewsController = new AbortController();
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

      const reviewsOptions = {
        signal: this.reviewsController.signal,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(`http://localhost:${this.state.reviewsPort}/api/totalReviewScore/${this.state.courseNumber}`, reviewsOptions)
        .then((responseData) => {
          return responseData.json();
        })
        .then((json) => {
          const fiveStar = parseInt(json.fiveStarPercent.split('%')[0]);
          const fourStar = parseInt(json.fourStarPercent.split('%')[0]);
          const positive = fiveStar + fourStar;
          const positiveReviews = positive.toString().concat('%');
          const reviewCount = json.reviewCount;
          this.setState({ positiveReviews });
          this.setState({ reviewCount });
        })
        .catch((err) => {
          if (err) {
            console.error('Error in GET starReviews', err);
          }
        });
    });
  }

  componentWillUnmount () {
    this.syllabusController.abort();
    this.imagesController.abort();
    this.reviewsController.abort();
  }

  render() {
    return (
      <div className="syllabus">
        <Header svgsData={this.state.svgsData} positiveReviews={this.state.positiveReviews} reviewCount={this.state.reviewCount} />
        <Weeks svgsData={this.state.svgsData} syllabusData={this.state.syllabusData} />
      </div>
    );
  }
}

export default Syllabus;