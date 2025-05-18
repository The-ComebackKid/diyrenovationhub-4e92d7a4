
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "10 Kitchen Renovation Ideas That Won't Break the Bank",
    excerpt: "Transform your kitchen with these budget-friendly renovation tips that focus on high-impact changes without a full remodel.",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1556910103-1c02745adc4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "May 15, 2023"
  },
  {
    id: 2,
    title: "How to Find Studs in Your Wall Without a Stud Finder",
    excerpt: "Learn reliable techniques to locate wall studs for hanging heavy items, even without specialized tools.",
    category: "Tips & Tricks",
    image: "https://images.unsplash.com/photo-1621155346337-1d19476ba5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1458&q=80",
    date: "June 3, 2023"
  },
  {
    id: 3,
    title: "DIY Bathroom Remodel: Step-by-Step Guide",
    excerpt: "Follow our comprehensive guide to completely transform your bathroom, from planning and demolition to final touches.",
    category: "Bathroom",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    date: "April 22, 2023"
  },
  {
    id: 4,
    title: "Beginner's Guide to Power Tools: What You Actually Need",
    excerpt: "Don't waste money on unnecessary tools. This guide covers the essential power tools every DIY homeowner should own.",
    category: "Tools",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "May 8, 2023"
  },
  {
    id: 5,
    title: "Understanding Permits: When You Need Them for Home Projects",
    excerpt: "Avoid costly fines and legal issues by learning which home renovation projects require permits and how to obtain them.",
    category: "Planning",
    image: "https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "June 12, 2023"
  },
  {
    id: 6,
    title: "Eco-Friendly Renovation: Sustainable Materials and Practices",
    excerpt: "Make your renovation project environmentally responsible with these sustainable materials and green building practices.",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1518793296402-e5f777038f7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "May 29, 2023"
  }
];

const categories = ["All", "Kitchen", "Bathroom", "Tools", "Tips & Tricks", "Planning", "Sustainability"];

const BlogPage = () => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 bengals-title">DIY Renovation Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert advice, step-by-step guides, and inspiration for your home renovation projects
          </p>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category, index) => (
            <Button 
              key={index} 
              variant={index === 0 ? "default" : "outline"} 
              className={index === 0 ? "bg-bengals-orange hover:bg-orange-500" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium bg-bengals-orange/10 text-bengals-orange px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="text-bengals-orange hover:underline flex items-center">
                  Read More 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
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
