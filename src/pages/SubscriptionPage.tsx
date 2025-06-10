
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Star } from 'lucide-react';
import { toast } from "sonner";
import { useEffect } from 'react';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  features: string[];
  popular?: boolean;
  icon: any;
  buyButtonId?: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    description: 'Perfect for getting started with DIY projects',
    features: [
      'Basic project guides',
      'Community access',
      'Basic contractor search',
      '5 AI chat messages per month',
      'Basic project calculator'
    ],
    icon: Star
  },
  {
    id: 'basic',
    name: 'DIY Enthusiast',
    price: 9.99,
    interval: 'month',
    description: 'Ideal for serious DIY enthusiasts',
    features: [
      'Unlimited chat with DIY Guy',
      'Basic project guides',
      'Community access',
      'Material calculators'
    ],
    popular: true,
    icon: Zap,
    buyButtonId: 'buy_btn_1RYP5YK34dlmm4voyQi9uiAH'
  },
  {
    id: 'premium',
    name: 'Renovation Pro',
    price: 19.99,
    interval: 'month',
    description: 'For professionals and power users',
    features: [
      'Everything in DIY Enthusiast',
      'Photo analysis & consultation',
      'Priority expert support',
      'Advanced project planning',
      'Contractor recommendations'
    ],
    icon: Crown,
    buyButtonId: 'buy_btn_1RYPFRK34dlmm4voEtzCv8Zq'
  }
];

const SubscriptionPage = () => {
  const { user } = useAuth();
  const [selectedInterval, setSelectedInterval] = useState<'month' | 'year'>('month');
  const [currentTier] = useState('free');

  // Load Stripe buy button script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleSubscribe = async (tierId: string) => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }

    if (tierId === 'free') {
      toast.info('You are already on the free plan');
      return;
    }

    toast.success(`Click the "Subscribe" button below to continue with ${tierId} plan`);
  };

  const getDiscountedPrice = (price: number) => {
    return selectedInterval === 'year' ? Math.round(price * 0.8) : price;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Unlock the full potential of your DIY projects
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Button
              variant={selectedInterval === 'month' ? 'default' : 'outline'}
              onClick={() => setSelectedInterval('month')}
              className={selectedInterval === 'month' ? 'bg-bengals-orange hover:bg-orange-500' : ''}
            >
              Monthly
            </Button>
            <Button
              variant={selectedInterval === 'year' ? 'default' : 'outline'}
              onClick={() => setSelectedInterval('year')}
              className={selectedInterval === 'year' ? 'bg-bengals-orange hover:bg-orange-500' : ''}
            >
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800">Save 20%</Badge>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => {
            const Icon = tier.icon;
            const isCurrentPlan = currentTier === tier.id;
            const discountedPrice = getDiscountedPrice(tier.price);
            
            return (
              <Card 
                key={tier.id} 
                className={`relative overflow-hidden ${
                  tier.popular ? 'ring-2 ring-bengals-orange scale-105' : ''
                } ${isCurrentPlan ? 'bg-gray-50' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-bengals-orange text-white px-4 py-1 rounded-b-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-bengals-orange/10 rounded-full">
                      <Icon className="h-8 w-8 text-bengals-orange" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${discountedPrice}
                    </span>
                    {tier.price > 0 && (
                      <>
                        <span className="text-gray-500">/{tier.interval}</span>
                        {selectedInterval === 'year' && tier.price > 0 && (
                          <div className="text-sm text-gray-500 line-through">
                            ${tier.price}/{tier.interval}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <CardDescription className="mt-2">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {tier.buyButtonId ? (
                    <div className="w-full">
                      <stripe-buy-button
                        buy-button-id={tier.buyButtonId}
                        publishable-key="pk_live_51RY0n6K34dlmm4voC0vvY3RtYYlgsnHTEFPQgidUuraMnaCnb9xYZ6wjGhu08mKMen7SajXI01wnQSNdad0rDD2E00sbYHuwgn"
                      />
                    </div>
                  ) : (
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => handleSubscribe(tier.id)}
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan ? 'Current Plan' : `Get ${tier.name}`}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600">Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing cycle.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, PayPal, and other popular payment methods through our secure payment processor.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">You can start with our free plan immediately. For paid plans, we offer a 7-day free trial so you can explore all premium features.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
