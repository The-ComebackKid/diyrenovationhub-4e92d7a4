
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
    stripePriceId: 'price_1QOwlQK34dlmm4voZNHs8UEm',
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
    stripePriceId: 'price_1QOwmOK34dlmm4voZNHs8UEm',
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
    stripePriceId: 'price_1QOwnMK34dlmm4voZNHs8UEm',
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
      console.log('Creating checkout session for:', priceId);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
      
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
      console.log('Creating customer portal session');
      
      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Redirect to Stripe customer portal
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL received');
      }
      
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
