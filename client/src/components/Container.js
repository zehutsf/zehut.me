import React from 'react';
import cx from 'classnames';
import '../styles/components/Container.scss';

const Container = ({ size = 'lg', children }) => {
  return (
    <div className={cx('Container', `Container--${size}`)}>
      {children}
    </div>
  );
}

export default Container;
