## Stripe powered site without webhooks

This is a demo featured on James Perkins YouTube Channel which you can find here https://youtu.be/E-PsyrV4VMQ

It's all powered by Clerk's package : https://github.com/clerkinc/use-stripe-subscription this package doesn't require Clerk at all and can be used with any authentication mechanism available.
## Installation

To use this project go ahead and check it out. 

```bash
  cd stripe-no-webhooks
  npm install 
  cp .env.local.sample > .env.local
```

Add all your environmental variables. 

### Add your products

In stripe add all of your products and make sure that your customer is allowed to add these products from the settings.

Then run the project
