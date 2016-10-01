import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { init as initFacebook } from './utils/facebook';
import { init as initStripe } from './utils/stripe';

const initialize = async () => {
  const configData = await fetch('/api/config');
  const config = await configData.json();
  
  await initFacebook({ appId: config.FACEBOOK_APP_ID });
  initStripe(config.STRIPE_KEY);

  ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
};

initialize();
