import React from 'react';
import { login } from '../utils/facebook';

const FacebookLogin = () => (
  <button onClick={() => login()}>
    Login to Facebook
  </button>
);

export default FacebookLogin;
