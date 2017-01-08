import React from 'react';
import ProportionalContainer from './ProportionalContainer';
import '../styles/components/InfoCard.scss';

const InfoCard = ({ title, subtitle, actionTitle, image, url }) => {
  return (
    <div className="InfoCard">
      <a href={url} target="_blank">
        <ProportionalContainer ratio={9/16}>
          <div 
            className="InfoCard-img" 
            style={{backgroundImage: `url(${image})`}}/>
        </ProportionalContainer>
        <div className="InfoCard-info">
          <h2 className="InfoCard-title">{title}</h2>
          <p className="InfoCard-subtitle">{subtitle}</p>
          <p className="InfoCard-link">{actionTitle}</p>
        </div>
      </a>
    </div>
  );
};

export default InfoCard;