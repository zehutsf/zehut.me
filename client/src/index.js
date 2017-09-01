import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { init as initFacebook } from './utils/facebook';
import { init as initStripe } from './utils/stripe';
import { loadConfig } from './utils/config';

const initialize = async () => {
  const config = await loadConfig();

  await initFacebook({ appId: config.FACEBOOK_APP_ID });
  initStripe(config.STRIPE_KEY);

  ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
};

initialize();
