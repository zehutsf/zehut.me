import React from 'react';
import Container from './Container';
import cx from 'classnames';

import '../styles/components/PageHeader.scss';

const PageHeader = ({ headline, text, image }) => {
  const backgroundStyle = {};
  if (image) {
    backgroundStyle.backgroundImage = `url(${image})`;
  }

  return (
    <div className={cx({
      PageHeader: true,
      'PageHeader--hasImage': !!image,
    })}>
      <div className="PageHeader-background" style={backgroundStyle}>
        <Container size="md">
          <div className="PageHeader-content">
            {headline && <h1 className="PageHeader-headline">{headline}</h1>}
            {text && <p className="PageHeader-text">{text}</p>}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PageHeader;
