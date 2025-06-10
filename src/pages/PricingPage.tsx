
import PricingSection from '@/components/PricingSection';

const PricingPage = () => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 bengals-title">Subscription Plans</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your DIY journey. All plans come with secure payment processing 
            through Stripe and can be managed easily through your account.
          </p>
        </div>
        
        <PricingSection />
        
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center bengals-title">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600 mt-2">Yes, you can cancel your subscription at any time from your Stripe customer portal. If you cancel, you'll still have access until the end of your current billing cycle.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">How secure are the payments?</h3>
              <p className="text-gray-600 mt-2">All payments are processed securely through Stripe, which is PCI DSS compliant and used by millions of businesses worldwide. We never store your payment information.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">What's included in emergency support?</h3>
              <p className="text-gray-600 mt-2">Premium subscribers get priority response for urgent DIY issues and can request guidance for complex problems through our support system.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">How do I manage my subscription?</h3>
              <p className="text-gray-600 mt-2">You can manage your subscription, update payment methods, and view billing history through the Stripe customer portal accessible from your account settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
