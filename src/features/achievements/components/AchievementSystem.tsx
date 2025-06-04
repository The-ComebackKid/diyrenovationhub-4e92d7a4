
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AchievementBadge, { Achievement } from './AchievementBadge';
import { Trophy, Users, BookOpen, Target } from 'lucide-react';

// Sample achievements data
const sampleAchievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first project step',
    icon: 'star',
    earned: true,
    earnedDate: '2024-01-15',
    category: 'completion'
  },
  {
    id: '2',
    name: 'Project Starter',
    description: 'Start your first DIY project',
    icon: 'hammer',
    earned: true,
    earnedDate: '2024-01-14',
    category: 'completion'
  },
  {
    id: '3',
    name: 'Tool Master',
    description: 'Use 5 different tools in projects',
    icon: 'wrench',
    earned: false,
    category: 'learning'
  },
  {
    id: '4',
    name: 'Community Helper',
    description: 'Help 10 community members',
    icon: 'trophy',
    earned: false,
    category: 'community'
  },
  {
    id: '5',
    name: 'Paint Expert',
    description: 'Complete 3 painting projects',
    icon: 'paint',
    earned: false,
    category: 'completion'
  },
  {
    id: '6',
    name: 'Quick Learner',
    description: 'Complete AI chat tutorial',
    icon: 'zap',
    earned: true,
    earnedDate: '2024-01-10',
    category: 'learning'
  }
];

interface AchievementSystemProps {
  userAchievements?: Achievement[];
}

const AchievementSystem = ({ userAchievements = sampleAchievements }: AchievementSystemProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const earnedAchievements = userAchievements.filter(a => a.earned);
  const totalPoints = earnedAchievements.length * 10; // 10 points per achievement
  
  const filteredAchievements = selectedCategory === 'all' 
    ? userAchievements 
    : userAchievements.filter(a => a.category === selectedCategory);

  const getCategoryStats = (category: string) => {
    const categoryAchievements = userAchievements.filter(a => a.category === category);
    const earned = categoryAchievements.filter(a => a.earned).length;
    return `${earned}/${categoryAchievements.length}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold bengals-title">Achievements</h3>
          <p className="text-gray-600">Track your DIY journey progress</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-bengals-orange">{totalPoints}</div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <Trophy className="h-6 w-6 mx-auto text-green-600 mb-1" />
          <div className="font-semibold">{earnedAchievements.length}</div>
          <div className="text-xs text-gray-600">Earned</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <Target className="h-6 w-6 mx-auto text-blue-600 mb-1" />
          <div className="font-semibold">{getCategoryStats('completion')}</div>
          <div className="text-xs text-gray-600">Completion</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <BookOpen className="h-6 w-6 mx-auto text-purple-600 mb-1" />
          <div className="font-semibold">{getCategoryStats('learning')}</div>
          <div className="text-xs text-gray-600">Learning</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <Users className="h-6 w-6 mx-auto text-orange-600 mb-1" />
          <div className="font-semibold">{getCategoryStats('community')}</div>
          <div className="text-xs text-gray-600">Community</div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="completion">Projects</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userAchievements.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completion" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userAchievements.filter(a => a.category === 'completion').map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="learning" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userAchievements.filter(a => a.category === 'learning').map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="community" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userAchievements.filter(a => a.category === 'community').map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userAchievements.filter(a => a.category === 'engagement').map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AchievementSystem;
