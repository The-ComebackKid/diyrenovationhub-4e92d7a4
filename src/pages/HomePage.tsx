import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import FaqSection from '@/components/FaqSection';
import PricingSection from '@/components/PricingSection';
import SEO from '@/components/SEO';
import Newsletter from '@/components/Newsletter';
import BlogPreview from '@/components/BlogPreview';
import VideoSection from '@/components/VideoSection';
import ContactForm from '@/components/ContactForm';
import SocialShare from '@/components/SocialShare';

const HomePage = () => {
  return (
    <div>
      <SEO />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight bengals-title">Transform Your Home <br/>with Expert DIY Guidance</h1>
              <p className="text-lg mb-6 text-gray-600">
                Get step-by-step renovation advice, connect with our community, and chat with our AI assistant for personalized help.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Link to="/chat">
                  <Button size="lg" className="w-full sm:w-auto bg-bengals-orange hover:bg-orange-500">
                    Try Our Chat Assistant
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-bengals-orange text-bengals-orange hover:bg-bengals-orange/10">
                    View Plans
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-bengals-orange"></div>
                  <div className="w-8 h-8 rounded-full bg-bengals-black"></div>
                  <div className="w-8 h-8 rounded-full bg-bengals-orange"></div>
                  <div className="w-8 h-8 rounded-full bg-bengals-black"></div>
                </div>
                <span className="text-sm text-gray-500">
                  Joined by 5,000+ DIY enthusiasts
                </span>
              </div>
              
              <div className="mt-6">
                <SocialShare 
                  title="DIY Renovation Hub - Transform Your Home with Expert Guidance"
                  description="Get step-by-step renovation advice, AI chat assistance, and join our supportive DIY community."
                />
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-bengals-orange p-3 rounded-lg shadow-lg transform rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1581092921461-39b9d080db65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
                  alt="Home renovation" 
                  className="rounded-md w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    <div className="w-8 h-8 rounded-full bg-bengals-orange flex items-center justify-center text-white text-xs">JS</div>
                    <div className="w-8 h-8 rounded-full bg-bengals-black flex items-center justify-center text-white text-xs">KP</div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Community Support</p>
                    <p className="text-xs text-gray-500">Get help in minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Partner logos */}
        <div className="container mx-auto mt-16 px-4">
          <p className="text-center text-sm text-gray-500 mb-6">TRUSTED PARTNERS</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <a href="https://www.lowes.com" target="_blank" rel="noopener noreferrer" className="grayscale hover:grayscale-0 transition-all">
              <div className="text-2xl font-bold text-blue-700">Lowe's</div>
            </a>
            <a href="https://www.homedepot.com" target="_blank" rel="noopener noreferrer" className="grayscale hover:grayscale-0 transition-all">
              <div className="text-2xl font-bold text-orange-600">Home Depot</div>
            </a>
            <a href="https://www.dewalt.com" target="_blank" rel="noopener noreferrer" className="grayscale hover:grayscale-0 transition-all">
              <div className="text-2xl font-bold text-yellow-500">DeWalt</div>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 bengals-title">Why Choose DIY Renovation Hub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide all the tools and knowledge you need to tackle renovation projects with confidence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-bengals-orange/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Chat Assistant</h3>
              <p className="text-gray-600 mb-4">Get personalized renovation advice from our AI assistant that learns your preferences and skill level</p>
              <Link to="/chat" className="text-bengals-orange hover:underline flex items-center">
                Try it now <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-bengals-orange/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 1 0 7.75"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">DIY Community</h3>
              <p className="text-gray-600 mb-4">Join thousands of DIY enthusiasts sharing tips, project photos, and support</p>
              <Link to="/community" className="text-bengals-orange hover:underline flex items-center">
                Join now <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-bengals-orange/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM13 13h4"></path><path d="M13 9h4"></path><path d="M13 17h4"></path><path d="M9 17l-2-2 2-2"></path><path d="M9 9l-2 2 2 2"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Step-by-Step Guides</h3>
              <p className="text-gray-600 mb-4">Follow detailed project guides with materials lists, tool recommendations, and budget estimates</p>
              <Link to="/blog" className="text-bengals-orange hover:underline flex items-center">
                Explore guides <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-bengals-orange/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Emergency Help</h3>
              <p className="text-gray-600 mb-4">Subscribers get round-the-clock emergency assistance for those DIY disasters that can't wait</p>
              <Link to="/pricing" className="text-bengals-orange hover:underline flex items-center">
                Learn more <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-bengals-orange/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Material Calculator</h3>
              <p className="text-gray-600 mb-4">Estimate exactly how much paint, flooring, or other materials you need for your specific project</p>
              <Link to="/tools" className="text-bengals-orange hover:underline flex items-center">
                Calculate now <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-bengals-orange/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost Saving Tips</h3>
              <p className="text-gray-600 mb-4">Learn industry secrets to save thousands on your renovation projects without compromising quality</p>
              <Link to="/blog/cost-saving" className="text-bengals-orange hover:underline flex items-center">
                Read tips <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorials Section */}
      <VideoSection />

      {/* Blog Preview Section */}
      <BlogPreview />

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 bengals-title">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of homeowners who've transformed their homes with our help
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-bengals-orange flex items-center justify-center text-white font-bold mr-4">
                  JD
                </div>
                <div>
                  <h3 className="font-semibold">John D.</h3>
                  <p className="text-sm text-gray-500">Homeowner & Aspiring DIYer</p>
                </div>
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#F97316" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">
                "I was always intimidated by home repairs, thinking they were too complex or expensive. DIY Renovation Hub completely changed my perspective! The articles are clear, the budgeting tools are incredibly helpful, and I finally understand the scope of work for projects I've been thinking about for years."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-bengals-orange flex items-center justify-center text-white font-bold mr-4">
                  SL
                </div>
                <div>
                  <h3 className="font-semibold">Sarah L.</h3>
                  <p className="text-sm text-gray-500">Experienced Renovator</p>
                </div>
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#F97316" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">
                "Finally, a DIY site that gets it! DIY Renovation Hub isn't just about tutorials; it's about the community. I love being able to share my experiences and learn from others. The insights on material costs and potential DIY savings are spot on. Plus, the links to Lowe's and Home Depot make sourcing materials so convenient!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <Newsletter />

      {/* FAQ Section */}
      <FaqSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Contact Form */}
      <ContactForm />

      {/* CTA Section */}
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
    </div>
  );
};

export default HomePage;
