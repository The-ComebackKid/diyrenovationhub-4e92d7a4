
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId: string;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'DIY Enthusiast',
    price: 9.99,
    interval: 'month',
    stripePriceId: 'price_basic_monthly',
    features: [
      'Unlimited chat with DIY Guy',
      'Basic project guides',
      'Community access',
      'Material calculators'
    ]
  },
  {
    id: 'premium',
    name: 'Renovation Pro',
    price: 19.99,
    interval: 'month',
    stripePriceId: 'price_premium_monthly',
    features: [
      'Everything in DIY Enthusiast',
      'Photo analysis & consultation',
      'Priority expert support',
      'Advanced project planning',
      'Contractor recommendations'
    ]
  },
  {
    id: 'expert',
    name: 'Master Builder',
    price: 39.99,
    interval: 'month',
    stripePriceId: 'price_expert_monthly',
    features: [
      'Everything in Renovation Pro',
      '24/7 emergency support',
      'One-on-one video consultations',
      'Custom project blueprints',
      'Exclusive masterclasses'
    ]
  }
];

export const useStripe = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createCheckoutSession = async (priceId: string) => {
    setLoading(true);
    try {
      // In a real app, this would call your backend API
      // For now, we'll simulate the process
      console.log('Creating checkout session for:', priceId);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Redirecting to Stripe...",
        description: "Setting up your secure payment portal",
      });
      
      // In production, redirect to actual Stripe checkout
      // window.location.href = checkoutUrl;
      
      // For demo purposes, show success message
      setTimeout(() => {
        toast({
          title: "Payment Demo",
          description: "In production, this would redirect to Stripe checkout!",
        });
      }, 2000);
      
    } catch (error) {
      console.error('Stripe error:', error);
      toast({
        title: "Payment Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPortalSession = async () => {
    setLoading(true);
    try {
      // Simulate customer portal access
      console.log('Creating customer portal session');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Customer Portal",
        description: "In production, this would open your Stripe customer portal!",
      });
      
    } catch (error) {
      console.error('Portal error:', error);
      toast({
        title: "Portal Error",
        description: "Unable to access customer portal.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    createPortalSession,
    loading,
    subscriptionPlans
  };
};
