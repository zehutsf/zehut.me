import React, { Component } from 'react';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';

import '../styles/pages/Academy.scss';

class Academy extends Component {
  constructor() {
    super();

    this.state = { loaded: false, loading: false, events: [] };
  }

  async componentDidMount() {
    if (this.state.loaded  || this.state.loading) {
      return;
    }

    try {
      // const response = await fetch('/api/academy');
      // const data = await response.json();
      this.setState({ loading: false, loaded: true, events: [] });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

  render() {
    return (
      <div>
        <PageHeader />
        <div className="Academy-content">
          <Container size="md">
            <h1>ZEHUT ACADEMY</h1>
            <p>
              Our main goal is to provide guidance and knowledge for Jewish young adult community Zehut San Francisco.
            </p>
            <div className="Academy-buttons">
              <a href="https://www.youtube.com/channel/UCE3TmZeBxs5a3Zd0AvtBBsQ" target="_blank" className="youtube">
                <i className="fa fa-youtube-play" aria-hidden="true"></i>
                <span>watch</span>
              </a>
              <a href="https://bumpers.fm/u/atg4a67rllu000q5e0ug" target="_blank" className="bumpers">
                <i className="fa fa-headphones" aria-hidden="true"></i>
                <span>listen</span>
              </a>
              <a href="https://www.facebook.com/groups/zehutsf/events/" target="_blank" className="schedule">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span>schedule</span>
              </a>
              <a href="mailto:rabbi@jlisf.org?Subject=I%20have%20a%20question!" className="askrabbi">
                <i className="fa fa-question-circle" aria-hidden="true"></i>
                <span>ask rabbi</span>
              </a>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default Academy;
