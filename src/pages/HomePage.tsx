
import SEO from '@/components/SEO';
import Newsletter from '@/components/Newsletter';
import BlogPreview from '@/components/BlogPreview';
import VideoSection from '@/components/VideoSection';
import ContactForm from '@/components/ContactForm';
import FaqSection from '@/components/FaqSection';
import PricingSection from '@/components/PricingSection';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import AffiliateLinks from '@/features/affiliate/components/AffiliateLinks';
import SeasonalContent from '@/features/seasonal/components/SeasonalContent';
import AchievementSystem from '@/features/achievements/components/AchievementSystem';
import { useAuth } from '@/hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <SEO />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Seasonal Content - High visibility for engagement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SeasonalContent />
        </div>
      </section>

      {/* Video Tutorials Section */}
      <VideoSection />

      {/* Affiliate Products - Revenue generation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AffiliateLinks title="Essential Tools for Your Next Project" maxItems={6} />
        </div>
      </section>

      {/* Blog Preview Section */}
      <BlogPreview />

      {/* Achievement System - Only show for logged in users */}
      {user && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <AchievementSystem />
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Newsletter Signup */}
      <Newsletter />

      {/* FAQ Section */}
      <FaqSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Contact Form */}
      <ContactForm />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default HomePage;
