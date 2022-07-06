import { requireAuth } from '@clerk/nextjs/api';
import { subscriptionHandler } from 'use-stripe-subscription';
import { findOrCreateCustomerId } from '../../utils/findOrCreateCustomer';

const handler = requireAuth(async (req, res) => {
  const customerId = await findOrCreateCustomerId({
    clerkUserId: req.auth.userId
  });
  console.log(customerId);
  res.json(
    await subscriptionHandler({ customerId, query: req.query, body: req.body })
  );
});

export default handler;
