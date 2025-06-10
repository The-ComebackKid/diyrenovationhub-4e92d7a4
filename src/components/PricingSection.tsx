
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useEffect } from "react";

const PricingSection = () => {
  // Load Stripe buy button script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const plans = [
    {
      id: 'basic',
      name: 'DIY Enthusiast',
      price: 9.99,
      buyButtonId: 'buy_btn_1RYP5YK34dlmm4voyQi9uiAH',
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
      buyButtonId: 'buy_btn_1RYPFRK34dlmm4voEtzCv8Zq',
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
      buyButtonId: 'buy_btn_1RYPHEK34dlmm4voaQZDXpLX',
      features: [
        'Everything in Renovation Pro',
        '24/7 emergency support',
        'One-on-one video consultations',
        'Custom project blueprints',
        'Exclusive masterclasses'
      ]
    },
    {
      id: 'contractor',
      name: 'Professional Contractor',
      price: 49.99,
      buyButtonId: 'buy_btn_1RYEwqK34dlmm4vob4rGvbYu',
      features: [
        'Everything in Master Builder',
        'Contractor dashboard access',
        'Lead generation tools',
        'Customer management system',
        'Project bidding assistance',
        'Business analytics & reporting',
        'White-label client portal',
        'Priority contractor support'
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bengals-title">Choose Your DIY Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From weekend warriors to renovation pros, we have the perfect plan to match your DIY ambitions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={plan.id} className={`relative ${index === 1 ? 'border-bengals-orange shadow-lg md:scale-105' : ''}`}>
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-bengals-orange text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3 text-gray-700">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="w-full">
                  <stripe-buy-button
                    buy-button-id={plan.buyButtonId}
                    publishable-key="pk_live_51RY0n6K34dlmm4voC0vvY3RtYYlgsnHTEFPQgidUuraMnaCnb9xYZ6wjGhu08mKMen7SajXI01wnQSNdad0rDD2E00sbYHuwgn"
                  />
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  Cancel anytime • 30-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need something custom? Enterprise solutions available.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
