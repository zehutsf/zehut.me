import React from 'react';
import InfoCard from './InfoCard';

const EventCard = ({ event }) => {
  const { name, displayDate, url, image } = event;

  return (
    <InfoCard
      url={url}
      image={image}
      title={name}
      subtitle={displayDate}
      actionTitle="Get tickets"
    />
  );
};

export default EventCard;