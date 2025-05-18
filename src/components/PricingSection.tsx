
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PricingSection = () => {
  const plans = [
    {
      title: "Basic",
      price: "$9.99",
      description: "Perfect for DIY beginners",
      features: [
        "Basic chatbot assistance (unlimited questions)",
        "Community forum access",
        "Basic project guides",
        "24/7 emergency support",
        "Free upgrade to Standard for first month"
      ],
      buttonText: "Start Basic",
      popular: false,
    },
    {
      title: "Standard",
      price: "$19.99",
      description: "For serious DIY enthusiasts",
      features: [
        "Enhanced chatbot with project analysis",
        "Video tutorials library",
        "Detailed project guides with materials calculator",
        "Priority 24/7 emergency support",
        "10% discount on partner stores",
        "Free upgrade to Premium for first month"
      ],
      buttonText: "Choose Standard",
      popular: true,
    },
    {
      title: "Premium",
      price: "$39.99",
      description: "The complete DIY package",
      features: [
        "Advanced AI chatbot with image recognition",
        "One-on-one virtual consultations",
        "Custom project plans",
        "Instant 24/7 emergency support",
        "20% discount on partner stores",
        "Free extra month after subscription"
      ],
      buttonText: "Go Premium",
      popular: false,
    }
  ];

  return (
    <section className="py-16 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bengals-title">Choose Your Plan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the plan that suits your DIY renovation needs. All plans include access to our community and basic learning resources.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.title} className={`flex flex-col ${plan.popular ? 'border-bengals-orange shadow-lg' : ''}`}>
              <CardHeader>
                {plan.popular && (
                  <div className="bg-bengals-orange text-white text-xs uppercase font-bold rounded-full py-1 px-3 inline-block mb-2">
                    Most Popular
                  </div>
                )}
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-bengals-black">{plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex">
                      <Check size={18} className="text-green-500 mr-2 shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className={`w-full ${plan.popular ? 'bg-bengals-orange hover:bg-orange-500' : ''}`}>
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
