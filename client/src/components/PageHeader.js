import React from 'react';
import Container from './Container';
import '../styles/components/PageHeader.scss';

const PageHeader = ({ headline, text }) => (
  <div className="PageHeader">
      <Container size="md">
        {headline && <h1 className="PageHeader-headline">{headline}</h1>}
        {text && <p className="PageHeader-text">{text}</p>}
      </Container>
  </div>
);

export default PageHeader;
