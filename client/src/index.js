import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { init as initFacebook } from './utils/facebook';

const initialize = async () => {
  const config = await fetch('/api/config');
  const fb = await initFacebook({ appId: process.env.REACT_APP_FACEBOOK_APP_ID });

  ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
};

initialize();
