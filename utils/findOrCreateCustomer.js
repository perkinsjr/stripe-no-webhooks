import { users } from '@clerk/nextjs/api';
import { stripeApiClient } from 'use-stripe-subscription';

export const findOrCreateCustomerId = async ({ clerkUserId }) => {
  let user = await users.getUser(clerkUserId);
  if (user.publicMetadata.stripeCustomerId) {
    return user.publicMetadata.stripeCustomerId;
  }

  const customerCreate = await stripeApiClient.customers.create(
    {
      name: user.firstName + ' ' + user.lastName,
      email: user.emailAddresses.find(x => x.id === user.primaryEmailAddressId)
        .emailAddress,
      metadata: {
        clerkUserId: user.id
      }
    },
    {
      idempotencyKey: user.id
    }
  );
  user = await users.updateUser(user.id, {
    publicMetadata: {
      stripeCustomerId: customerCreate.id
    }
  });
  return user.publicMetadata.stripeCustomerId;
};
