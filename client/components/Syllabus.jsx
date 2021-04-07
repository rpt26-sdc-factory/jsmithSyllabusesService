import React from 'react';
import Weeks from './Weeks.jsx';
import Header from './Header.jsx';
import state from './initial/state.js';

class Syllabus extends React.Component {
  constructor(props) {
    super(props);
    this.state = state;
    this.controller = new AbortController();
  }

  fetches () {
    const options = { signal: this.controller.signal };
    fetch(`http://${this.state.servicesIp}:${this.state.syllabusPort}/api/syllabus/${this.state.courseNumber}`, options)
      .then(responseData => responseData.json())
      .then((responseJSON) => { this.setState({ syllabusData: responseJSON }); })
      .catch((err) => { if (err) { console.error('Error in GET syllabus', err); } });

    fetch(`http://${this.state.servicesIp}:${this.state.imagesPort}/api/svgs`, options)
      .then(responseData => responseData.json())
      .then(responseJSON => this.setState({ svgsData: responseJSON }))
      .catch((err) => { if (err) { console.error('Error in GET svgs', err); } });

    fetch(`http://${this.state.reviewsIp}:${this.state.reviewsPort}/api/totalReviewScore/${this.state.courseNumber}`, options)
      .then(responseData => responseData.json())
      .then((responseJSON) => {
        const fiveStar = parseInt(responseJSON.fiveStarPercent.split('%')[0]);
        const fourStar = parseInt(responseJSON.fourStarPercent.split('%')[0]);
        const positiveReviews = fiveStar + fourStar;
        this.setState({ positiveReviews: positiveReviews.toString().concat('%') });
        this.setState({ reviewCount: responseJSON.reviewCount });
      })
      .catch((err) => { if (err) { console.error('Error in GET starReviews', err); } });
  }

  //sets initial state, then sets courseNumber from window, then fetches data
  componentDidMount() {
    const courseNumber = window.location.pathname.split('/')[1] || 1;
    this.setState({ courseNumber }, () => { this.fetches(); });
  }

  componentWillUnmount () {
    this.controller.abort();
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
