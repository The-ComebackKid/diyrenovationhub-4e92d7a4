
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useStripe } from "@/hooks/useStripe";

const PricingSection = () => {
  const { createCheckoutSession, loading, subscriptionPlans } = useStripe();

  const handleSubscribe = async (priceId: string) => {
    await createCheckoutSession(priceId);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bengals-title">Choose Your DIY Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From weekend warriors to renovation pros, we have the perfect plan to match your DIY ambitions
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptionPlans.map((plan, index) => (
            <Card key={plan.id} className={`relative ${index === 1 ? 'border-bengals-orange shadow-lg scale-105' : ''}`}>
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-bengals-orange text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">/{plan.interval}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${index === 1 ? 'bg-bengals-orange hover:bg-orange-500' : ''}`}
                  variant={index === 1 ? 'default' : 'outline'}
                  disabled={loading}
                  onClick={() => handleSubscribe(plan.stripePriceId)}
                >
                  {loading ? 'Processing...' : `Start ${plan.name}`}
                </Button>
                
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
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
