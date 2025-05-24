
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from 'lucide-react';
import { useProjects } from '@/features/community/hooks/useProjects';
import ProjectCard from '@/features/community/components/ProjectCard';
import { useAuth } from '@/hooks/useAuth';

const popularTags = [
  "Kitchen", "Bathroom", "Flooring", "Paint", "Electrical", "Plumbing", "Tools",
  "Beginner", "Advanced", "Before & After", "Budget", "Design", "Outdoor"
];

const CommunityPage = () => {
  const { projects, loading, likeProject, unlikeProject } = useProjects();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2 bengals-title">DIY Community</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with fellow DIY enthusiasts, share your projects, and get advice from the community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          {/* Main Content - Projects */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Featured Projects</h2>
              {user ? (
                <Link to="/create-project">
                  <Button className="bg-bengals-orange hover:bg-orange-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Share Project
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button className="bg-bengals-orange hover:bg-orange-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Login to Share
                  </Button>
                </Link>
              )}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onLike={likeProject}
                  onUnlike={unlikeProject}
                />
              ))}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No projects shared yet.</p>
                <p className="text-gray-400">Be the first to share your DIY project!</p>
              </div>
            )}

            {/* Load More */}
            {projects.length > 0 && (
              <div className="text-center">
                <Button variant="outline">Load More Projects</Button>
              </div>
            )}
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
                  <span className="text-gray-600">Projects Shared</span>
                  <span className="font-semibold">{projects.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Online Now</span>
                  <span className="font-semibold">328</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active This Week</span>
                  <span className="font-semibold">1,247</span>
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
              {user ? (
                <Link to="/create-project">
                  <Button className="w-full bg-white text-bengals-orange hover:bg-gray-100">
                    Share Your First Project
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button className="w-full bg-white text-bengals-orange hover:bg-gray-100">
                    Create Account
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
