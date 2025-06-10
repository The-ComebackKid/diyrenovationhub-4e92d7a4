
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Star } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  features: string[];
  popular?: boolean;
  icon: any;
  buyButtonId: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'DIY Enthusiast',
    price: 9.99,
    interval: 'month',
    description: 'Perfect for weekend DIY projects',
    features: [
      'Unlimited chat with DIY Guy',
      'Basic project guides',
      'Community access',
      'Material calculators',
      'Project inspiration gallery',
      'Basic troubleshooting support'
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
    description: 'For serious home improvers',
    features: [
      'Everything in DIY Enthusiast',
      'Photo analysis & consultation',
      'Priority expert support',
      'Advanced project planning',
      'Contractor recommendations',
      'Cost estimation tools',
      'Progress tracking features',
      'Premium video tutorials'
    ],
    icon: Crown,
    buyButtonId: 'buy_btn_1RYPFRK34dlmm4voEtzCv8Zq'
  },
  {
    id: 'expert',
    name: 'Master Builder',
    price: 39.99,
    interval: 'month',
    description: 'Complete professional solution',
    features: [
      'Everything in Renovation Pro',
      '24/7 emergency support',
      'One-on-one video consultations',
      'Custom project blueprints',
      'Exclusive masterclasses',
      'Direct expert line',
      'Advanced safety guidance',
      'Commercial project support'
    ],
    icon: Star,
    buyButtonId: 'buy_btn_1RYPHEK34dlmm4voaQZDXpLX'
  }
];

const SubscriptionPage = () => {
  const { user } = useAuth();

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Unlock the full potential of your DIY projects with expert guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => {
            const Icon = tier.icon;
            
            return (
              <Card 
                key={tier.id} 
                className={`relative overflow-hidden ${
                  tier.popular ? 'ring-2 ring-bengals-orange scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-bengals-orange text-white px-4 py-1 rounded-b-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-bengals-orange/10 rounded-full">
                      <Icon className="h-8 w-8 text-bengals-orange" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${tier.price}
                    </span>
                    <span className="text-gray-500">/{tier.interval}</span>
                  </div>
                  <CardDescription className="mt-2">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Everything you get:</h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="w-full">
                    <stripe-buy-button
                      buy-button-id={tier.buyButtonId}
                      publishable-key="pk_live_51RY0n6K34dlmm4voC0vvY3RtYYlgsnHTEFPQgidUuraMnaCnb9xYZ6wjGhu08mKMen7SajXI01wnQSNdad0rDD2E00sbYHuwgn"
                    />
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Cancel anytime • 30-day money-back guarantee
                  </p>
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
              <div>
                <h3 className="font-semibold mb-2">What's included in emergency support?</h3>
                <p className="text-gray-600">Emergency support provides 24/7 access to our expert team for urgent DIY issues, safety concerns, and time-sensitive project guidance.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
