import React from 'react';
import ProportionalContainer from './ProportionalContainer';
import '../styles/components/EventCard.scss';

const EventCard = ({ event }) => {
  const { name, displayDate, url, image } = event;

  return (
    <div className="EventCard">
      <a href={url} target="_blank">
        <ProportionalContainer ratio={9/16}>
          <div className="EventCard-img" style={{backgroundImage: `url(${image})`}}/>
        </ProportionalContainer>
        <div className="EventCard-info">
          <h2 className="EventCard-name">{name}</h2>
          <p className="EventCard-date">{displayDate}</p>
          <p className="EventCard-link">Get tickets</p>
        </div>
      </a>
    </div>
  );
};

export default EventCard;