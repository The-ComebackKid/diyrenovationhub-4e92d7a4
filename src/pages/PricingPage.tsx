
import PricingSection from '@/components/PricingSection';

const PricingPage = () => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 bengals-title">Subscription Plans</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your DIY journey. Upgrade or downgrade anytime.
            All plans come with a 7-day free trial and no commitment.
          </p>
        </div>
        
        <PricingSection />
        
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center bengals-title">Frequently Asked Questions About Our Plans</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600 mt-2">Yes, you can cancel your subscription at any time from your account settings. If you cancel, you'll still have access until the end of your current billing cycle.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">How do the free upgrades work?</h3>
              <p className="text-gray-600 mt-2">When you subscribe to Basic, you'll automatically get Standard features for your first month. If you choose Standard, you'll get Premium features for the first month. This lets you try the higher tier without paying extra.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">What's included in the emergency support?</h3>
              <p className="text-gray-600 mt-2">All subscribers get 24/7 access to emergency support for urgent DIY issues. Premium members get priority response (typically within minutes) and can request video consultations for complex problems.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">How do the partner discounts work?</h3>
              <p className="text-gray-600 mt-2">Standard and Premium subscribers receive exclusive discount codes for Lowe's, Home Depot, and other partner stores. These codes are available in your account dashboard and update monthly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
