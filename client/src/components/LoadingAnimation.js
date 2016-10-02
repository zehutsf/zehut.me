import React from 'react';
import cx from 'classnames';
import '../styles/components/LoadingAnimation.scss';

// https://github.com/tobiasahlin/SpinKit/blob/master/scss/spinners/7-three-bounce.scss
const LoadingAnimation = ({ light=false }) => (
  <div className={cx({
    'sk-three-bounce': true,
    'sk-three-bounce--light': light
  })}>
    <div className="sk-child sk-bounce1"></div>
    <div className="sk-child sk-bounce2"></div>
    <div className="sk-child sk-bounce3"></div>
  </div>
);

export default LoadingAnimation;
