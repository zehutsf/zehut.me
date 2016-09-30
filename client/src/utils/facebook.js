/* global FB */
import Subscriber from './subscriber';

const emitter = new Subscriber();
const handleAuthResponseChange = response => emitter.notify('auth', response);
const handleStatusResponseChange = response => emitter.notify('status', response);
export const addAuthListener = listener => emitter.subscribe('auth', listener);
export const addStatusListener = listener => emitter.subscribe('status', listener);

const loadSDK = () => {
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};

export const init = ({ appId, version = 'v2.7', status = true }, callback = () => {}) => {
  window.fbAsyncInit = () => {
    FB.init({
      appId,
      version,
      status,
      cookie: false
    });

    FB.Event.subscribe('auth.authResponseChange', handleAuthResponseChange);
    FB.Event.subscribe('auth.statusChange', handleStatusResponseChange);

    callback();
  };

  loadSDK();
};

export const getLoginStatus = () => {
  return new Promise(resolve => {
    FB.getLoginStatus(response => resolve(response))
  });
};

const DEFAULT_OPTIONS = { scope: 'email,public_profile' };
export const login = (options = DEFAULT_OPTIONS) => {
  options = { ...options, return_scopes: true };

  // https://developers.facebook.com/docs/facebook-login/login-flow-for-web/v2.4
  return new Promise((resolve, reject) => {
    FB.login(response => resolve(response), options);
  });
};

export const share = (url = window.location.toString()) => {
   FB.ui({
    method: 'share',
    href: url
  }, () => {});
};

