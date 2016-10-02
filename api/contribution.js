import { 
  getExistingPlanByAmount, 
  createPlan,
  createCustomerWithPlan,
  createCharge
} from './stripe';

// Options for passing to Stripe API given specified amount
const getPlanDefinition = (amount) => ({
  amount, 
  id: `zehut-me-${amount/100}`,
  name: `Zehut.me Monthly $${amount/100}`
});

export const createMonthlyContribution = async (source, email, amount) => {
  let plan = await getExistingPlanByAmount(amount);
  if (!plan) {
    plan = await createPlan(
      getPlanDefinition(amount)
    );
  }

 const customer = await createCustomerWithPlan({
    plan: plan.id,
    description: `Customer with ${email}`,
    source: source
  });

  return {
    token: source,
    type: 'monthly',
    email,
    amount,
    planId: plan.id,
    customerId: customer.id
  };
};

export const createOneTimeContribution = async (source, email, amount) => {
  const charge = await createCharge({
    amount, 
    source,
    description: `Charge for ${email} for $${amount/100}`
  });

  return {
    token: source,
    type: 'one-time',
    email,
    amount,
    chargeId: charge.id, 
    customerId: charge.customer || '' // not always present
  };
};
