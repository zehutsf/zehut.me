/* global StripeCheckout */
import Deferred from './Deferred';

// Since the Stripe Checkout has a single callback for receiving tokens,
// create a deferred promise on every "open" in order to use a Promise-based API
let deferredPromise = null;
const tokenCallback = (token) => {
  deferredPromise._resolved = true;
  deferredPromise.resolve(token);
};

const closedCallback = () => {
  if (!deferredPromise._resolved) {
    deferredPromise.resolve();
  }
};

// https://stripe.com/docs/checkout#integration-custom
let handler = null;
const initHandler = (key) => {
  handler = StripeCheckout.configure({
    key,
    token: tokenCallback,
    allowRememberMe: true
  });
};

export const init = initHandler;
export const open = (props) => {
  deferredPromise = new Deferred();
  props.closed = closedCallback;
  handler.open(props);
  return deferredPromise.promise;
};
