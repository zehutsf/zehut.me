import React, { Component } from 'react';
import Container from '../components/Container';
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

  render() {
    const { events } = this.state;

    return (
      <div>
        <div className="Events-header">
          <Container size="lg">
            <h1>Events</h1>
          </Container>
        </div>
        <div className="Events-content">
          <Container size="lg">
            <ul>
              {events.map(event => (
                <li key={event.id}><a href={event.url}>{event.name}</a></li>
              ))}
            </ul>
          </Container>
        </div>
      </div>
    );
  }
}

export default Events;