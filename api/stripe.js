import stripeApi from 'stripe';

const stripe = stripeApi(process.env.STRIPE_SECRET_KEY);

export const createCharge = ({ amount, description, source }) => {
  return new Promise((resolve, reject) => {
    stripe.charges.create({
      amount,
      source,
      description,
      currency: 'usd'
    }, (err, charge) => err ? reject(err) : resolve(charge))
  });
};

export const createCustomerWithPlan = ({ source, plan, description }) => {
  return new Promise((resolve, reject) => {
    stripe.customers.create({
      description,
      source,
      plan
    }, (err, customer) => err ? reject(err) : resolve(customer));
  });
};

// https://stripe.com/docs/api/node#plans
export const createPlan = ({ amount, id, name }) => {
  return new Promise((resolve, reject) => {
    stripe.plans.create({
      amount, id, name, interval: 'month', currency: 'usd'
    }, (err, plan) => err ? reject(err) : resolve(plan));
  });
};

// https://stripe.com/docs/api/node#list_plans
const listPlans = ({ startingAfter }) => {
  const data = { 
    limit: 100,
    'include[]': 'total_count' 
  };

  if (startingAfter) {
    data.starting_after = startingAfter; 
  }

  return new Promise((resolve, reject) => {
    stripe.plans.list(
      data, 
      (err, plans) => err ? reject(err) : resolve(plans)
    );
  });
};

// Iteratively loads all pages of plans (multiple API calls if paginated)
export const getAllPlans = async () => {
  let hasMore = true;
  let planInfo, startingAfter;
  let plans = [];

  while (hasMore) {
    planInfo = await listPlans({ startingAfter });
    
    // Concatenate list of plans
    if (planInfo.data && planInfo.data.length) {
      plans = [...plans, ...planInfo.data];
    }

    hasMore = planInfo.hasMore;

    // Assign pagination cursor if there are more to load
    if (hasMore) {
      const lastItem = planInfo.data[planInfo.data.length - 1];
      startingAfter = lastItem.id;
    }
  };

  return mapMonthlyPlansByAmount(plans);
};

const mapMonthlyPlansByAmount = (plans) => {
  return plans.reduce((acc, plan) => {
    const { amount, interval } = plan;
    if (interval === 'month') {
      acc[amount] = plan;
    }

    return acc;
  }, {});
};

export const getExistingPlanByAmount = async (amount) => {
  const plansByAmount = await getAllPlans();
  return plansByAmount[amount];
};
