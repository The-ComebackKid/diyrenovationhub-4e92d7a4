
import { useState } from 'react';
import { Play, Video, Clock, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  author: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  views: string;
}

const videoTutorials: VideoTutorial[] = [
  {
    id: '1',
    title: 'Complete Kitchen Renovation: Start to Finish',
    description: 'Follow along as we completely transform a dated kitchen into a modern masterpiece.',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '45:32',
    author: 'DIY Guy',
    category: 'Kitchen',
    difficulty: 'Intermediate',
    views: '125K'
  },
  {
    id: '2',
    title: 'Installing Laminate Flooring Like a Pro',
    description: 'Step-by-step guide to installing laminate flooring with professional results.',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '28:15',
    author: 'Floor Master Mike',
    category: 'Flooring',
    difficulty: 'Beginner',
    views: '89K'
  },
  {
    id: '3',
    title: 'Bathroom Tile Installation: Professional Techniques',
    description: 'Learn the secrets of perfect tile installation from planning to grouting.',
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '35:45',
    author: 'Tile Master Tim',
    category: 'Bathroom',
    difficulty: 'Advanced',
    views: '67K'
  },
  {
    id: '4',
    title: 'Essential Power Tools Every DIYer Needs',
    description: 'Comprehensive guide to building your tool collection on any budget.',
    thumbnail: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '22:30',
    author: 'Tool Expert Tony',
    category: 'Tools',
    difficulty: 'Beginner',
    views: '156K'
  },
  {
    id: '5',
    title: 'Painting Techniques for Perfect Results',
    description: 'Professional painting tips that will make your walls look flawless.',
    thumbnail: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '31:20',
    author: 'Paint Pro Pete',
    category: 'Painting',
    difficulty: 'Intermediate',
    views: '92K'
  },
  {
    id: '6',
    title: 'Electrical Basics: Wiring a Light Switch',
    description: 'Safety-first approach to basic electrical work every homeowner should know.',
    thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '18:45',
    author: 'Electric Ed',
    category: 'Electrical',
    difficulty: 'Intermediate',
    views: '74K'
  }
];

const VideoSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(videoTutorials.map(video => video.category))];
  
  const filteredVideos = selectedCategory === 'All' 
    ? videoTutorials 
    : videoTutorials.filter(video => video.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bengals-title flex items-center justify-center">
            <Video className="mr-2 text-bengals-orange" />
            Video Tutorials
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn by watching our comprehensive video tutorials. From basic repairs to complete renovations, 
            our step-by-step guides make complex projects manageable.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-bengals-orange hover:bg-orange-500" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white rounded-full p-4">
                    <Play size={32} className="text-bengals-orange ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center">
                  <Clock size={12} className="mr-1" />
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                    {video.difficulty}
                  </span>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span className="bg-bengals-orange/10 text-bengals-orange px-2 py-1 rounded text-xs font-medium">
                    {video.category}
                  </span>
                  <span>{video.views} views</span>
                </div>
                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">
                  {video.description}
                </CardDescription>
                
                <div className="flex items-center text-sm text-gray-500">
                  <User size={14} className="mr-1" />
                  <span>{video.author}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Want access to our complete video library and exclusive content?
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="bg-bengals-orange hover:bg-orange-500">
              Subscribe for Full Access
            </Button>
            <Button variant="outline">
              Browse All Videos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
