
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Hammer, Wrench, PaintBucket, Zap } from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  category: 'completion' | 'engagement' | 'learning' | 'community';
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

const AchievementBadge = ({ achievement, size = 'md' }: AchievementBadgeProps) => {
  const getIcon = (iconName: string) => {
    const iconProps = {
      className: `${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'}`
    };
    
    switch (iconName) {
      case 'trophy': return <Trophy {...iconProps} />;
      case 'star': return <Star {...iconProps} />;
      case 'hammer': return <Hammer {...iconProps} />;
      case 'wrench': return <Wrench {...iconProps} />;
      case 'paint': return <PaintBucket {...iconProps} />;
      case 'zap': return <Zap {...iconProps} />;
      default: return <Star {...iconProps} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'completion': return 'bg-green-100 text-green-800 border-green-200';
      case 'engagement': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'learning': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'community': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`
      ${achievement.earned ? 'opacity-100' : 'opacity-50 grayscale'}
      ${size === 'sm' ? 'p-2' : size === 'lg' ? 'p-6' : 'p-4'}
      bg-white rounded-lg border-2 ${getCategoryColor(achievement.category)}
      transition-all hover:scale-105 cursor-pointer
    `}>
      <div className="flex flex-col items-center text-center space-y-2">
        <div className={`
          ${achievement.earned ? 'text-bengals-orange' : 'text-gray-400'}
          transition-colors
        `}>
          {getIcon(achievement.icon)}
        </div>
        
        <div>
          <h4 className={`font-semibold ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'}`}>
            {achievement.name}
          </h4>
          <p className={`text-gray-600 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            {achievement.description}
          </p>
          
          {achievement.earned && achievement.earnedDate && (
            <Badge variant="secondary" className="mt-1 text-xs">
              Earned {new Date(achievement.earnedDate).toLocaleDateString()}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;
