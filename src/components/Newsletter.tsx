
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      // In production, this would call your newsletter service API
      console.log('Newsletter signup:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Thanks for subscribing! Check your email for confirmation.');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-bengals-orange">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get DIY Tips & Project Ideas
          </h2>
          <p className="text-orange-100 mb-8">
            Join 10,000+ subscribers getting weekly renovation tips, project tutorials, and exclusive discounts.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border-white"
              required
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-bengals-black hover:bg-gray-800 text-white"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          <p className="text-orange-100 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
