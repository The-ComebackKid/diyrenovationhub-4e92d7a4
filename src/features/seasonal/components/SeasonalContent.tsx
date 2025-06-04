
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Thermometer, Snowflake, Sun, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SeasonalProject {
  id: string;
  title: string;
  description: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeframe: string;
  image: string;
  tags: string[];
  estimatedCost: string;
}

const seasonalProjects: SeasonalProject[] = [
  {
    id: '1',
    title: 'Spring Garden Cleanup & Planting',
    description: 'Prepare your garden for the growing season with cleanup, soil prep, and strategic planting.',
    season: 'spring',
    difficulty: 'beginner',
    timeframe: '2-3 weekends',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    tags: ['Garden', 'Outdoor', 'Planting'],
    estimatedCost: '$50-150'
  },
  {
    id: '2',
    title: 'Summer Deck Staining & Repair',
    description: 'Protect and beautify your deck with proper staining and minor repairs before peak usage.',
    season: 'summer',
    difficulty: 'intermediate',
    timeframe: '1 weekend',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    tags: ['Deck', 'Staining', 'Outdoor'],
    estimatedCost: '$100-300'
  },
  {
    id: '3',
    title: 'Fall Weatherproofing Checklist',
    description: 'Prepare your home for winter with caulking, insulation checks, and heating system maintenance.',
    season: 'fall',
    difficulty: 'intermediate',
    timeframe: '3-4 weekends',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    tags: ['Weatherproofing', 'Insulation', 'Maintenance'],
    estimatedCost: '$75-200'
  },
  {
    id: '4',
    title: 'Winter Holiday Lighting Setup',
    description: 'Create stunning holiday displays with safe electrical installation and creative lighting design.',
    season: 'winter',
    difficulty: 'beginner',
    timeframe: '1 weekend',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop',
    tags: ['Holiday', 'Lighting', 'Electrical'],
    estimatedCost: '$30-120'
  }
];

const SeasonalContent = () => {
  const getCurrentSeason = (): 'spring' | 'summer' | 'fall' | 'winter' => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  };

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'spring': return <Leaf className="h-4 w-4 text-green-500" />;
      case 'summer': return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'fall': return <Leaf className="h-4 w-4 text-orange-500" />;
      case 'winter': return <Snowflake className="h-4 w-4 text-blue-500" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'spring': return 'bg-green-100 text-green-800 border-green-200';
      case 'summer': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'fall': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'winter': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentSeason = getCurrentSeason();
  const currentSeasonProjects = seasonalProjects.filter(p => p.season === currentSeason);
  const upcomingProjects = seasonalProjects.filter(p => p.season !== currentSeason);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-bengals-orange" />
          <h3 className="text-xl font-semibold bengals-title">Seasonal Projects</h3>
        </div>
        <div className="flex items-center space-x-2">
          {getSeasonIcon(currentSeason)}
          <span className="text-sm font-medium capitalize">{currentSeason} Focus</span>
        </div>
      </div>

      {/* Current Season Projects */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4 flex items-center">
          <Thermometer className="h-5 w-5 mr-2 text-bengals-orange" />
          Perfect for This Season
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentSeasonProjects.map((project) => (
            <div key={project.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={`${getSeasonColor(project.season)} border`}>
                    <span className="flex items-center space-x-1">
                      {getSeasonIcon(project.season)}
                      <span className="capitalize">{project.season}</span>
                    </span>
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className={getDifficultyColor(project.difficulty)}>
                    {project.difficulty}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h5 className="font-semibold mb-2">{project.title}</h5>
                <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span>🕒 {project.timeframe}</span>
                  <span>💰 {project.estimatedCost}</span>
                </div>
                
                <Button asChild size="sm" className="w-full bg-bengals-orange hover:bg-orange-500">
                  <Link to={`/blog/seasonal/${project.id}`}>
                    Start This Project
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming/Other Season Projects */}
      <div>
        <h4 className="text-lg font-medium mb-4">Plan Ahead</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingProjects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <Badge className={`${getSeasonColor(project.season)} border text-xs`}>
                  <span className="flex items-center space-x-1">
                    {getSeasonIcon(project.season)}
                    <span className="capitalize">{project.season}</span>
                  </span>
                </Badge>
                <Badge className={`${getDifficultyColor(project.difficulty)} text-xs`}>
                  {project.difficulty}
                </Badge>
              </div>
              
              <h5 className="font-medium text-sm mb-2">{project.title}</h5>
              <p className="text-xs text-gray-600 mb-2">{project.description}</p>
              
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>{project.timeframe}</span>
                <span>{project.estimatedCost}</span>
              </div>
              
              <Button asChild variant="outline" size="sm" className="w-full text-xs">
                <Link to={`/blog/seasonal/${project.id}`}>
                  Learn More
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-bengals-orange/10 rounded-lg">
        <p className="text-sm text-center">
          <strong>💡 Pro Tip:</strong> Planning seasonal projects ahead of time ensures you have materials ready and can take advantage of off-season sales!
        </p>
      </div>
    </div>
  );
};

export default SeasonalContent;
