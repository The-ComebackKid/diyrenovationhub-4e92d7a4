
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;
