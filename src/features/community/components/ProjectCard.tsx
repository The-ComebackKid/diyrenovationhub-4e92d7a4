
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Clock, DollarSign, User } from 'lucide-react';
import { Project } from '../hooks/useProjects';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface ProjectCardProps {
  project: Project;
  onLike: (projectId: string, userId: string) => Promise<boolean>;
  onUnlike: (projectId: string, userId: string) => Promise<boolean>;
}

const ProjectCard = ({ project, onLike, onUnlike }: ProjectCardProps) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (!user) {
      toast.error('Please log in to like projects');
      return;
    }

    if (isLiked) {
      const success = await onUnlike(project.id, user.id);
      if (success) {
        setIsLiked(false);
      }
    } else {
      const success = await onLike(project.id, user.id);
      if (success) {
        setIsLiked(true);
      }
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      {project.images && project.images.length > 0 && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={project.images[0]} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          {project.featured && (
            <Badge className="absolute top-2 left-2 bg-bengals-orange">
              Featured
            </Badge>
          )}
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
            <div className="flex items-center space-x-2 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={project.user_profiles?.avatar_url} />
                <AvatarFallback>
                  <User className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">
                {project.user_profiles?.display_name || 'Anonymous'}
              </span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-400">
                {formatTimeAgo(project.created_at)}
              </span>
            </div>
          </div>
          <Badge className={getDifficultyColor(project.difficulty_level)}>
            {project.difficulty_level}
          </Badge>
        </div>
        
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            {project.category}
          </Badge>
          {project.estimated_time_hours && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {project.estimated_time_hours}h
            </Badge>
          )}
          {project.estimated_cost && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              ${project.estimated_cost}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{project.likes_count}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span>0</span>
            </Button>
          </div>
          
          <Button variant="outline" size="sm">
            View Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
