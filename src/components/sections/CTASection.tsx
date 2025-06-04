
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-bengals-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 bengals-title">Ready to Start Your DIY Journey?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of homeowners who are saving money and creating the homes of their dreams with DIY Renovation Hub.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/auth">
            <Button size="lg" variant="outline" className="border-bengals-orange text-bengals-orange hover:bg-bengals-orange hover:text-white">
              Create Free Account
            </Button>
          </Link>
          <Link to="/pricing">
            <Button size="lg" className="bg-bengals-orange hover:bg-orange-500">
              View Subscription Plans
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
