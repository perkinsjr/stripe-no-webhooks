
import Head from 'next/head';
import { Gate, useSubscription } from 'use-stripe-subscription';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { PricingCard } from '../components/PricingCard'

export default function Home() {
  const { isLoaded, products, } =
    useSubscription();

  if (!isLoaded) {
    return null;
  }

  
  return (
    <Container as ="main">
      <Head>
        <title>No Stripe webhooks</title>
      </Head>
      <Box as="section">

        
        <Stack

          direction={{
            base: 'column',
            lg: 'column',
          }}
        >
          <Stack
            spacing={{
              base: '4',
              md: '5',
            }}
            maxW="5xl"
          >
            <Stack >
              <Text color="accent" fontWeight="semibold">
                Pricing
              </Text>
              <Heading>
                Get access to my awesome subscriptions
              </Heading>
            </Stack>
            <Text
              fontSize={{
                base: 'lg',
                md: 'xl',
              }}
              color="muted"
              maxW="3xl"
            >
              Choose from basic or premium 
            </Text>
          </Stack>
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
            }}
          >
            {products.map((product) => {
              return(
                  <PricingCard  key={product.id} products={product} />
              )
               
            })}
          </SimpleGrid>
        </Stack>
    </Box>
    </Container>
  );
}
