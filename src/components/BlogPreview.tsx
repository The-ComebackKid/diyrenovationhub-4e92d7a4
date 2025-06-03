
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Video, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  type?: 'article' | 'video';
  videoUrl?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Kitchen Renovation Mistakes to Avoid',
    excerpt: 'Learn from common pitfalls that can cost you thousands and delay your kitchen project.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'DIY Guy',
    date: '2024-01-15',
    category: 'Kitchen',
    readTime: '8 min read',
    type: 'article'
  },
  {
    id: '2',
    title: 'Budget-Friendly Bathroom Makeover Ideas',
    excerpt: 'Transform your bathroom without breaking the bank with these creative and affordable solutions.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Sarah Johnson',
    date: '2024-01-12',
    category: 'Bathroom',
    readTime: '6 min read',
    type: 'article'
  },
  {
    id: '3',
    title: 'Essential Power Tools Every DIYer Should Own',
    excerpt: 'Complete guide to building your tool collection with must-have power tools for any home project.',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Mike Chen',
    date: '2024-01-10',
    category: 'Tools',
    readTime: '12 min watch',
    type: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '4',
    title: 'How to Install Laminate Flooring Like a Pro',
    excerpt: 'Step-by-step video guide showing you exactly how to install laminate flooring in any room.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'DIY Guy',
    date: '2024-01-08',
    category: 'Flooring',
    readTime: '15 min watch',
    type: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '5',
    title: 'Wiring a Light Switch: Safety First Guide',
    excerpt: 'Learn the basics of electrical work with this comprehensive guide to safely wiring light switches.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Electric Ed',
    date: '2024-01-05',
    category: 'Electrical',
    readTime: '10 min read',
    type: 'article'
  },
  {
    id: '6',
    title: 'Painting Techniques That Save Time and Money',
    excerpt: 'Professional painting tips and techniques to get perfect results on your first try.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Paint Pro Pete',
    date: '2024-01-03',
    category: 'Painting',
    readTime: '18 min watch',
    type: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

const BlogPreview = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bengals-title">Latest DIY Tips, Guides & Video Tutorials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest renovation guides, project tutorials, expert tips, and step-by-step video content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
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
                  <span className="bg-bengals-orange text-white px-2 py-1 rounded text-xs mr-2">
                    {post.category}
                  </span>
                  <Calendar size={14} className="mr-1" />
                  <span className="mr-3">{new Date(post.date).toLocaleDateString()}</span>
                  <div className="flex items-center">
                    {post.type === 'video' ? <Video size={14} className="mr-1" /> : <Clock size={14} className="mr-1" />}
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User size={14} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  
                  <Link to={`/blog/${post.id}`} className="text-bengals-orange hover:underline text-sm font-medium flex items-center">
                    {post.type === 'video' ? 'Watch' : 'Read'} <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button size="lg" className="bg-bengals-orange hover:bg-orange-500">
              View All Content
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
