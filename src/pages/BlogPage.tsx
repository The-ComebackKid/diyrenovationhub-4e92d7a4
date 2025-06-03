
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, Clock, Search, Calendar, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "10 Kitchen Renovation Ideas That Won't Break the Bank",
    excerpt: "Transform your kitchen with these budget-friendly renovation tips that focus on high-impact changes without a full remodel.",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "January 15, 2024",
    author: "DIY Guy",
    readTime: "8 min read",
    type: "article",
    featured: true
  },
  {
    id: 2,
    title: "How to Find Studs in Your Wall Without a Stud Finder",
    excerpt: "Learn reliable techniques to locate wall studs for hanging heavy items, even without specialized tools.",
    category: "Tips & Tricks",
    image: "https://images.unsplash.com/photo-1621155346337-1d19476ba5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1458&q=80",
    date: "January 12, 2024",
    author: "Mike Chen",
    readTime: "5 min read",
    type: "article"
  },
  {
    id: 3,
    title: "Complete Bathroom Remodel: Start to Finish",
    excerpt: "Follow our comprehensive video guide to completely transform your bathroom, from planning and demolition to final touches.",
    category: "Bathroom",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    date: "January 10, 2024",
    author: "Sarah Johnson",
    readTime: "25 min watch",
    type: "video",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: 4,
    title: "Essential Power Tools Every DIYer Should Own",
    excerpt: "Don't waste money on unnecessary tools. This guide covers the essential power tools every DIY homeowner should own.",
    category: "Tools",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "January 8, 2024",
    author: "Tool Master Tom",
    readTime: "12 min read",
    type: "article"
  },
  {
    id: 5,
    title: "Installing Laminate Flooring Like a Pro",
    excerpt: "Step-by-step video tutorial showing you exactly how to install laminate flooring in any room of your house.",
    category: "Flooring",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "January 5, 2024",
    author: "DIY Guy",
    readTime: "18 min watch",
    type: "video",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: 6,
    title: "Understanding Building Permits: When You Need Them",
    excerpt: "Avoid costly fines and legal issues by learning which home renovation projects require permits and how to obtain them.",
    category: "Planning",
    image: "https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "January 3, 2024",
    author: "Legal Lisa",
    readTime: "10 min read",
    type: "article"
  },
  {
    id: 7,
    title: "Painting Techniques That Save Time and Money",
    excerpt: "Professional painting tips and techniques to get perfect results on your first try, saving both time and materials.",
    category: "Painting",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "December 30, 2023",
    author: "Paint Pro Pete",
    readTime: "15 min watch",
    type: "video",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: 8,
    title: "Eco-Friendly Renovation: Sustainable Materials Guide",
    excerpt: "Make your renovation project environmentally responsible with these sustainable materials and green building practices.",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1518793296402-e5f777038f7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "December 28, 2023",
    author: "Green Guru Gary",
    readTime: "7 min read",
    type: "article"
  },
  {
    id: 9,
    title: "Electrical Safety: DIY vs When to Call a Pro",
    excerpt: "Learn which electrical projects you can safely tackle yourself and when you absolutely need to call a professional.",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "December 25, 2023",
    author: "Electric Ed",
    readTime: "9 min read",
    type: "article"
  },
  {
    id: 10,
    title: "Tile Installation: Complete Video Tutorial",
    excerpt: "Master the art of tile installation with this comprehensive video guide covering tools, techniques, and troubleshooting.",
    category: "Bathroom",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "December 22, 2023",
    author: "Tile Master Tim",
    readTime: "22 min watch",
    type: "video",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: 11,
    title: "Budget Planning for Home Renovations",
    excerpt: "Learn how to accurately budget for your renovation project and avoid costly surprises along the way.",
    category: "Planning",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "December 20, 2023",
    author: "Budget Bob",
    readTime: "11 min read",
    type: "article"
  },
  {
    id: 12,
    title: "Installing a Ceiling Fan: Step by Step",
    excerpt: "Complete video walkthrough of installing a ceiling fan, including wiring, mounting, and safety considerations.",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "December 18, 2023",
    author: "DIY Guy",
    readTime: "14 min watch",
    type: "video",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
];

const categories = ["All", "Kitchen", "Bathroom", "Tools", "Tips & Tricks", "Planning", "Sustainability", "Electrical", "Flooring", "Painting"];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bengals-title">DIY Renovation Hub</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Expert advice, step-by-step guides, video tutorials, and inspiration for your home renovation projects. 
            From beginner tips to advanced techniques, we've got you covered.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search articles and videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button 
              key={category} 
              variant={selectedCategory === category ? "default" : "outline"} 
              className={selectedCategory === category ? "bg-bengals-orange hover:bg-orange-500" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && !searchTerm && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 bengals-title">Featured Article</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover"
                    />
                    {featuredPost.type === 'video' && (
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="bg-white rounded-full p-4">
                          <Video size={32} className="text-bengals-orange" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="bg-bengals-orange text-white px-3 py-1 rounded text-sm mr-3">
                      {featuredPost.category}
                    </span>
                    <Calendar size={16} className="mr-1" />
                    <span className="mr-4">{featuredPost.date}</span>
                    <div className="flex items-center">
                      {featuredPost.type === 'video' ? <Video size={16} className="mr-1" /> : <Clock size={16} className="mr-1" />}
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User size={16} className="mr-2" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <Link to={`/blog/${featuredPost.id}`}>
                      <Button className="bg-bengals-orange hover:bg-orange-500">
                        {featuredPost.type === 'video' ? 'Watch Now' : 'Read Article'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {post.type === 'video' && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white rounded-full p-3">
                      <Video size={24} className="text-bengals-orange" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="text-xs font-medium bg-bengals-orange/10 text-bengals-orange px-2 py-1 rounded-full mr-2">
                    {post.category}
                  </span>
                  <Calendar size={14} className="mr-1" />
                  <span className="mr-3">{post.date}</span>
                  <div className="flex items-center">
                    {post.type === 'video' ? <Video size={14} className="mr-1" /> : <Clock size={14} className="mr-1" />}
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User size={14} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <Link to={`/blog/${post.id}`} className="text-bengals-orange hover:underline flex items-center">
                    {post.type === 'video' ? 'Watch' : 'Read More'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No content found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button className="bg-bengals-orange hover:bg-orange-500">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
