import {
    Box,
    Button,
    Circle,
    Heading,
    HStack,
    Icon,
    List,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  
  import { FiCheck } from 'react-icons/fi'
  import { useSubscription, Gate } from 'use-stripe-subscription'
  export const PricingCard = (props) => {
    const {redirectToCheckout, redirectToCustomerPortal} = useSubscription();
    const { products} = props
    const {product,prices} = products;
    const dollarUSLocale = Intl.NumberFormat('en-US');
    const features = ['Unlimited projects', 'Lifetime access', 'Customer support', 'Free updates']
    return (
      <Box
        bg="bg-surface"
        borderRadius="2xl"
        boxShadow={mode('lg', 'lg-dark')}
        px={{
          base: '6',
          md: '14',
        }}
        py="8"
        position="relative"
        overflow="hidden"
      >
        <Stack spacing="8" textAlign="center">
          <Stack spacing="5" align="center">
            <Stack spacing="4">
              <Heading>
                ${dollarUSLocale.format(prices[0].unit_amount/100)}
              </Heading>
              <Stack spacing="1">
                <Text fontSize="xl" fontWeight="semibold">
                  {product.name}
                </Text>
                <Text color="muted">{product.description}</Text>
              </Stack>
            </Stack>
          </Stack>
          <List as="ul" spacing="4">
            {features.map((feature) => (
              <HStack key={feature} as="li" spacing="3">
                <Circle size="6" bg={mode('blue.50', 'whiteAlpha.50')}>
                  <Icon as={FiCheck} color="accent" />
                </Circle>
                <Text color="muted">{feature}</Text>
              </HStack>
            ))}
          </List>
                <Gate unsubscribed>
          <Button variant="primary" size="lg" onClick={() => redirectToCheckout({ price: prices[0].id })}>
            Get started
          </Button>
          </Gate>
          <Gate product={product} negate>
          <Button variant="primary" size="lg" onClick={() => redirectToCustomerPortal()}>
           Update your subscription
          </Button>

          </Gate>
          <Gate product={product}>
          <Button variant="primary" size="lg" onClick={() => redirectToCustomerPortal()}>
           Upgrade
          </Button>
          </Gate>
        </Stack>
       
      </Box>
    )
  }