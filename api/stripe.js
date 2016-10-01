import stripeApi from 'stripe';

const stripe = stripeApi(process.env.STRIPE_API_KEY);

export const createCharge = ({ amount, description, source }) => {
  return new Promise(resolve => {
    stripe.charges.create({
      amount,
      source,
      description,
      currency: "usd",
      currency: "usd",
      source: "tok_189fTS2eZvKYlo2CcYJIOGkr", // obtained with Stripe.js
      description: "Charge for addison.wilson@example.com"
    }, (error, charge) => {
      error ? resolve({ error }) : resolve({ charge });
    });
  });
};

export const createSubscription = ({ description, source, plan }) => {
  return new Promise(resolve => {
    stripe.customers.create({
      description,
      source,
      plan
    }, (error, customer) => {
      error ? resolve({ error }) : resolve({ customer });
    });
  });
};
