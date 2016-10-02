import React from 'react';
import cx from 'classnames';
import '../styles/components/Container.scss';

const Container = ({ size = 'lg', children, className }) => {
  return (
    <div className={cx('Container', `Container--${size}`, className)}>
      {children}
    </div>
  );
}

export default Container;
