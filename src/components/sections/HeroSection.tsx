
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import SocialShare from '@/components/SocialShare';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
