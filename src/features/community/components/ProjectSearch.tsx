
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Search, Filter, X } from 'lucide-react';

const categories = [
  'Kitchen', 'Bathroom', 'Bedroom', 'Living Room', 'Outdoor', 'Garden',
  'Furniture', 'Storage', 'Electrical', 'Plumbing', 'Painting', 'Flooring'
];

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

export interface SearchFilters {
  searchTerm: string;
  category: string;
  difficulty: string;
  minCost: number;
  maxCost: number;
  sortBy: 'newest' | 'oldest' | 'popular' | 'cost_asc' | 'cost_desc';
}

interface ProjectSearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
}

const ProjectSearch = ({ onFiltersChange, initialFilters = {} }: ProjectSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    category: '',
    difficulty: '',
    minCost: 0,
    maxCost: 1000,
    sortBy: 'newest',
    ...initialFilters
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      searchTerm: '',
      category: '',
      difficulty: '',
      minCost: 0,
      maxCost: 1000,
      sortBy: 'newest'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = filters.searchTerm || filters.category || filters.difficulty || 
    filters.minCost > 0 || filters.maxCost < 1000;

  return (
    <Card className="p-4 mb-6">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={filters.searchTerm}
              onChange={(e) => updateFilters({ searchTerm: e.target.value })}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value as any })}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="cost_asc">Cost: Low to High</SelectItem>
              <SelectItem value="cost_desc">Cost: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.category} onValueChange={(value) => updateFilters({ category: value === 'all_categories' ? '' : value })}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_categories">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.difficulty} onValueChange={(value) => updateFilters({ difficulty: value === 'all_levels' ? '' : value })}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_levels">All Levels</SelectItem>
              {difficultyLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Advanced Filters</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Cost Range</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minCost}
                    onChange={(e) => updateFilters({ minCost: Number(e.target.value) })}
                    className="w-20"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxCost}
                    onChange={(e) => updateFilters({ maxCost: Number(e.target.value) })}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-500">$</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-600">Active filters:</span>
            {filters.searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {filters.searchTerm}
                <button onClick={() => updateFilters({ searchTerm: '' })}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.category}
                <button onClick={() => updateFilters({ category: '' })}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.difficulty && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.difficulty}
                <button onClick={() => updateFilters({ difficulty: '' })}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectSearch;
