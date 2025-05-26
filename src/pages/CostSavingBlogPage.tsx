
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Lightbulb, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SEO from '@/components/SEO';

const CostSavingBlogPage = () => {
  return (
    <div>
      <SEO 
        title="Ultimate Cost-Saving Tips for DIY Renovations - DIY Renovation Hub"
        description="Learn professional secrets to save thousands on your renovation projects without compromising quality."
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-bengals-orange hover:underline mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4 bengals-title">
                Ultimate Cost-Saving Tips for DIY Renovations
              </h1>
              <div className="flex items-center text-gray-600 mb-6">
                <span>By DIY Guy</span>
                <span className="mx-2">•</span>
                <span>January 20, 2024</span>
                <span className="mx-2">•</span>
                <span>12 min read</span>
              </div>
            </header>

            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="DIY renovation tools and materials"
              className="w-full h-64 object-cover rounded-lg mb-8"
            />

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                After helping thousands of homeowners save money on their renovations, I've learned the industry secrets that can cut your project costs by 30-50% without sacrificing quality. Here's everything contractors don't want you to know.
              </p>

              <Card className="p-6 bg-bengals-orange/5 border-bengals-orange/20 mb-8">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-6 w-6 text-bengals-orange mr-2" />
                  <h3 className="text-lg font-semibold">Quick Win</h3>
                </div>
                <p className="text-gray-700">
                  Most homeowners overpay by 40% simply because they don't know when to buy materials. Shopping end-of-season sales alone can save you thousands.
                </p>
              </Card>

              <h2 className="text-2xl font-bold mb-4 bengals-title">The 80/20 Rule of Renovation Spending</h2>
              <p className="mb-6">
                Spend 80% of your budget on areas people see daily (kitchen countertops, main bathroom, living room flooring) and save on hidden elements (inside of cabinets, basement ceiling, utility room finishes).
              </p>

              <h3 className="text-xl font-semibold mb-4">Where to Splurge:</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Kitchen countertops and backsplash
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Main bathroom fixtures and vanity
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Front door and entryway
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Main living area flooring
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Where to Save:</h3>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Interior door hardware (use spray paint to update)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Basement and utility room finishes
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Inside of cabinets and closets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Trim in low-traffic areas
                </li>
              </ul>

              <Card className="p-6 bg-blue-50 border-blue-200 mb-8">
                <div className="flex items-center mb-4">
                  <Lightbulb className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold">Pro Tip</h3>
                </div>
                <p className="text-gray-700">
                  Buy your tiles, hardwood, and paint during end-of-season clearances. Store them properly and you'll have premium materials at budget prices when you're ready to start.
                </p>
              </Card>

              <h2 className="text-2xl font-bold mb-4 bengals-title">The Secret Shopping Strategy</h2>
              <p className="mb-6">
                Timing your material purchases can save you 30-60% on the same exact products. Here's when to buy what:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Best Times to Buy:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Appliances: Black Friday, end of model year</li>
                    <li>• Lumber: Late fall/winter</li>
                    <li>• Paint: Spring clearances</li>
                    <li>• Tools: Father's Day, Black Friday</li>
                    <li>• Outdoor materials: End of summer</li>
                  </ul>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Avoid Buying During:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Spring (everyone's renovating)</li>
                    <li>• Right before holidays</li>
                    <li>• Peak construction season</li>
                    <li>• When you're in a rush</li>
                  </ul>
                </Card>
              </div>

              <p className="text-center text-gray-600 mt-12">
                Want more money-saving tips? Join our community of budget-conscious DIYers and get weekly cost-cutting strategies.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default CostSavingBlogPage;
