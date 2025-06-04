
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

const HomePage = () => {
  return (
    <div>
      <SEO />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Video Tutorials Section */}
      <VideoSection />

      {/* Blog Preview Section */}
      <BlogPreview />

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
