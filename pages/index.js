import { UserButton, UserProfile } from '@clerk/nextjs';
import Head from 'next/head';
import { Gate, useSubscription } from 'use-stripe-subscription';

export default function Home() {
  const { isLoaded, products, redirectToCheckout, redirectToCustomerPortal } =
    useSubscription();

  if (!isLoaded) {
    return null;
  }

  return (
    <main style={{ padding: '1rem 2rem' }}>
      <Head>
        <title>use-stripe-subscription</title>
      </Head>
      <h1>use-stripe-subscription demo</h1>
      <h2>Plans</h2>
      {products.map(({ product, prices }) => (
        <div key={product.id}>
          <h4>{product.name}</h4>
          <Gate unsubscribed>
            {prices.map(price => (
              <button
                key={price.id}
                onClick={() => redirectToCheckout({ price: price.id })}
              >
                Purchase {price.unit_amount} {price.currency}
              </button>
            ))}
          </Gate>
          <Gate product={product}>Active plan</Gate>
          <Gate product={product} negate>
            <button onClick={() => redirectToCustomerPortal()}>
              Change plan
            </button>
          </Gate>
        </div>
      ))}
      <h2>Account management</h2>
      <UserButton />
    </main>
  );
}
