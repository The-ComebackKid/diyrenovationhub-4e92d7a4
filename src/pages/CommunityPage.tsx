
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const communityPosts = [
  {
    id: 1,
    author: "JohnDIY",
    authorImage: "https://i.pravatar.cc/150?img=1",
    title: "Need advice on kitchen backsplash installation",
    content: "I'm planning to install a ceramic tile backsplash in my kitchen this weekend. Has anyone used those peel-and-stick tiles? Are they worth it or should I go with traditional tiles?",
    date: "2 hours ago",
    likes: 24,
    comments: 18,
    tags: ["Kitchen", "Backsplash", "Tiles"]
  },
  {
    id: 2,
    author: "RenovationQueen",
    authorImage: "https://i.pravatar.cc/150?img=5",
    title: "Before and After: Living Room Makeover",
    content: "Just finished my living room renovation! Painted the walls Agreeable Gray by Sherwin-Williams, added crown molding, and replaced the carpet with LVP. Total cost was under $2,000.",
    date: "Yesterday",
    likes: 156,
    comments: 47,
    tags: ["Living Room", "Paint", "Flooring", "Before & After"]
  },
  {
    id: 3,
    author: "HandyDan",
    authorImage: "https://i.pravatar.cc/150?img=3",
    title: "Help! Cut into a pipe while drilling",
    content: "I was mounting a TV bracket and accidentally drilled into what must be a water pipe. I've shut off the main water supply. What's the best way to repair this without calling a plumber?",
    date: "1 day ago",
    likes: 32,
    comments: 43,
    tags: ["Emergency", "Plumbing", "Repair"]
  },
  {
    id: 4,
    author: "DIY_Newbie",
    authorImage: "https://i.pravatar.cc/150?img=7",
    title: "First time using a miter saw - tips?",
    content: "Just bought my first miter saw for a baseboards project. Any safety tips or things I should know before I start? I've watched some YouTube videos but would love advice from experienced users.",
    date: "2 days ago",
    likes: 18,
    comments: 26,
    tags: ["Tools", "Safety", "Beginner"]
  },
  {
    id: 5,
    author: "HomeImprovementPro",
    authorImage: "https://i.pravatar.cc/150?img=8",
    title: "How I saved $5,000 on my bathroom renovation",
    content: "Just completed a full bathroom renovation for under $3,000. I kept the same layout, did all the labor myself, and shopped sales for fixtures. Happy to share my detailed budget and tips!",
    date: "3 days ago",
    likes: 204,
    comments: 78,
    tags: ["Bathroom", "Budget", "Success Story"]
  }
];

const popularTags = [
  "Kitchen", "Bathroom", "Flooring", "Paint", "Electrical", "Plumbing", "Tools",
  "Beginner", "Advanced", "Before & After", "Budget", "Design", "Outdoor"
];

const CommunityPage = () => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 bengals-title">DIY Community</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with fellow DIY enthusiasts, share your projects, and get advice from the community
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Posts */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Discussions</h2>
              <Button className="bg-bengals-orange hover:bg-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                New Post
              </Button>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img src={post.authorImage} alt={post.author} className="w-12 h-12 rounded-full" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </Button>
                      </div>
                      
                      <p className="mt-3 text-gray-600">{post.content}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-bengals-orange">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                          <span>{post.likes} likes</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-bengals-orange">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                          <span>{post.comments} comments</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-bengals-orange ml-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline">Load More Posts</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Members</span>
                  <span className="font-semibold">15,243</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Online Now</span>
                  <span className="font-semibold">328</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-semibold">87</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Discussions</span>
                  <span className="font-semibold">342</span>
                </div>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <Link 
                    key={index} 
                    to={`/community/tag/${tag.toLowerCase()}`}
                    className="bg-gray-100 hover:bg-bengals-orange/10 hover:text-bengals-orange text-gray-600 text-xs px-2 py-1 rounded-full transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Join Community CTA */}
            <div className="bg-bengals-orange text-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-2">Join Our Community</h3>
              <p className="text-sm mb-4">Share your projects, get expert advice, and connect with fellow DIY enthusiasts</p>
              <Button className="w-full bg-white text-bengals-orange hover:bg-gray-100">
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
