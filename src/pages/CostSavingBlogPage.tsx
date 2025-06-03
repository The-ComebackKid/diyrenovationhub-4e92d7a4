
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, TrendingDown, Calculator, Lightbulb, Search, Calendar, User, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const costSavingArticles = [
  {
    id: 1,
    title: "10 Ways to Cut Your Renovation Budget by 50%",
    excerpt: "Discover professional secrets that can slash your renovation costs without compromising on quality or style.",
    category: "Budget Tips",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "January 15, 2024",
    author: "Budget Bob",
    readTime: "8 min read",
    savings: "$5,000-$15,000"
  },
  {
    id: 2,
    title: "DIY vs Contractor: When to Do It Yourself",
    excerpt: "Learn which projects you can tackle yourself and which require professional help to maximize savings.",
    category: "Planning",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "January 12, 2024",
    author: "DIY Guy",
    readTime: "6 min read",
    savings: "$2,000-$8,000"
  },
  {
    id: 3,
    title: "Seasonal Shopping: Best Times to Buy Materials",
    excerpt: "Time your purchases right and save up to 70% on construction materials, appliances, and fixtures.",
    category: "Shopping Tips",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "January 10, 2024",
    author: "Deal Hunter Dan",
    readTime: "5 min read",
    savings: "$1,500-$5,000"
  },
  {
    id: 4,
    title: "Free and Cheap Sources for Quality Materials",
    excerpt: "Discover hidden sources for discounted, surplus, and free building materials that pros don't want you to know about.",
    category: "Material Sources",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "January 8, 2024",
    author: "Resource Rick",
    readTime: "10 min read",
    savings: "$3,000-$10,000"
  },
  {
    id: 5,
    title: "Energy-Efficient Upgrades That Pay for Themselves",
    excerpt: "Invest in renovations that not only improve your home but also reduce your monthly bills significantly.",
    category: "Energy Savings",
    image: "https://images.unsplash.com/photo-1518793296402-e5f777038f7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "January 5, 2024",
    author: "Green Guru Gary",
    readTime: "7 min read",
    savings: "$500-$2,000/year"
  },
  {
    id: 6,
    title: "Negotiating with Contractors: Insider Tips",
    excerpt: "Learn the art of negotiation to get better prices without sacrificing quality workmanship.",
    category: "Contractor Tips",
    image: "https://images.unsplash.com/photo-1621155346337-1d19476ba5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "January 3, 2024",
    author: "Negotiator Nancy",
    readTime: "9 min read",
    savings: "$2,000-$7,000"
  }
];

const quickTips = [
  {
    tip: "Buy materials during off-season sales",
    savings: "Up to 50% off"
  },
  {
    tip: "Use architectural salvage for unique pieces",
    savings: "60-80% less than new"
  },
  {
    tip: "Do your own demolition work",
    savings: "$2,000-$5,000"
  },
  {
    tip: "Paint instead of replacing cabinets",
    savings: "$8,000-$15,000"
  }
];

const CostSavingBlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = costSavingArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/blog" className="inline-flex items-center text-bengals-orange hover:underline mb-4">
            <ArrowLeft size={16} className="mr-1" />
            Back to All Articles
          </Link>
          <h1 className="text-4xl font-bold mb-4 bengals-title flex items-center justify-center">
            <DollarSign className="mr-2 text-green-600" />
            Cost-Saving Renovation Tips
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Professional secrets and insider tips to dramatically reduce your renovation costs without sacrificing quality. 
            Save thousands on your next project with these proven strategies.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <TrendingDown className="w-8 h-8 text-green-600 mx-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">50%</div>
              <div className="text-sm text-gray-600">Average Savings</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader className="pb-2">
              <DollarSign className="w-8 h-8 text-bengals-orange mx-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-bengals-orange">$15K+</div>
              <div className="text-sm text-gray-600">Potential Savings</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader className="pb-2">
              <Calculator className="w-8 h-8 text-blue-600 mx-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">100+</div>
              <div className="text-sm text-gray-600">Money-Saving Tips</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader className="pb-2">
              <Lightbulb className="w-8 h-8 text-yellow-600 mx-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">Pro</div>
              <div className="text-sm text-gray-600">Insider Secrets</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tips */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Quick Money-Saving Tips</CardTitle>
            <CardDescription className="text-center">
              Start saving immediately with these simple strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {quickTips.map((tip, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">{tip.tip}</span>
                  <span className="font-semibold text-green-600">{tip.savings}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search cost-saving tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="bg-bengals-orange text-white px-2 py-1 rounded text-xs font-bold">
                    Save {article.savings}
                  </span>
                </div>
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-3">{article.date}</span>
                  </div>
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User size={14} className="mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <Link to={`/blog/${article.id}`} className="text-bengals-orange hover:underline font-medium">
                    Read More →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-bengals-orange rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="mb-6 text-lg">
            Join our community and get access to exclusive cost-saving guides and contractor discounts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-bengals-orange">
                Create Free Account
              </Button>
            </Link>
            <Link to="/tools">
              <Button size="lg" className="bg-white text-bengals-orange hover:bg-gray-100">
                Use Cost Calculator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostSavingBlogPage;
