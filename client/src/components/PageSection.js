import React from 'react';
import cx from 'classnames';

import '../styles/components/PageSection.scss';

const PageSection = ({ alt=false, children }) => {

  return (
    <div className={cx({
      PageSection: true,
      'PageSection--alt': alt,
    })}>
      {children}
    </div>
  );
};

export default PageSection;
