import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Container, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

// Styling for cards
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  minHeight : 350,
  margin: '20px auto',
  padding: '10px',
  borderRadius: '15px',
  // boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  display : "flex",
  flexDirection : "column",
  justifyContent : "space-between",

}));

// SubscriptionCard Component
const SubscriptionCard = ({ title, price, description, features }) => (
  <StyledCard>
    <CardContent>
      <Typography variant="h5" component="div" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div" gutterBottom>
        {price}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {description}
      </Typography>
      <Box marginTop={2}>
        {features.map((feature, index) => (
          <Typography key={index} variant="body2" color="text.secondary">
            • {feature}
          </Typography>
        ))}
      </Box>
    </CardContent>
    <CardActions>
      <Button size="large" variant="contained" color="primary" fullWidth>
        Subscribe
      </Button>
    </CardActions>
  </StyledCard>
);

// SubscriptionPage Component
const SubscriptionPage = () => {
  const subscriptions = [
    {
      title: "Basic Plan",
      price: "$9.99/month",
      description: "Perfect for individuals who are just starting.",
      features: ["Access to basic features", "Email support", "Monthly reports"],
    },
    {
      title: "Pro Plan",
      price: "$29.99/month",
      description: "Ideal for professionals who need advanced tools.",
      features: ["All Basic features", "Priority support", "Weekly reports", "Access to premium tools"],
    }
  ];

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '30px' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Choose Your Subscription
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {subscriptions.map((plan, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <SubscriptionCard {...plan} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SubscriptionPage;
