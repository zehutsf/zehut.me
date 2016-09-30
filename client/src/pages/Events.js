import React, { Component } from 'react';
import Container from '../components/Container';
import FacebookStatus from '../components/FacebookStatus';
import FacebookLogin from '../components/FacebookLogin';
import EventCard from '../components/EventCard';

import '../styles/pages/Events.scss';

class Events extends Component {
  constructor() {
    super();

    this.state = { loaded: false, loading: false, events: [] };
  }

  async componentDidMount() {
    if (this.state.loaded  || this.state.loading) {
      return;
    }

    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      this.setState({ loading: false, loaded: true, events: data.events });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

  renderCards() {
      const { events } = this.state;
      
      return (
        <div className="Events-cards">
          {events.map(event => (
            <div className="Events-cardContainer">
              <EventCard key={event.id} event={event} />
            </div>
          ))}
        </div>
      );
  }

  render() {
    return (
      <div>
        <div className="Events-header">
          <Container size="md">
            <h1 className="Events-headline">Event Calendar</h1>
          </Container>
        </div>
        <div className="Events-content">
          <Container size="md">
            <FacebookStatus>
              {(status) => {
                if (status.status === 'not_authorized') {
                  return <FacebookLogin />;
                }
                return this.renderCards();
              }}
            </FacebookStatus>
          </Container>
        </div>
      </div>
    );
  }
}

export default Events;