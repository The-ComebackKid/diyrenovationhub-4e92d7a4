
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from 'lucide-react';

const categories = [
  'All',
  'Tools',
  'Hardware',
  'Electrical',
  'Plumbing',
  'Painting',
  'Safety',
  'Storage',
  'Measuring',
  'Lighting'
];

const priceRanges = [
  { label: 'Under $25', min: 0, max: 2500 },
  { label: '$25 - $50', min: 2500, max: 5000 },
  { label: '$50 - $100', min: 5000, max: 10000 },
  { label: '$100 - $200', min: 10000, max: 20000 },
  { label: 'Over $200', min: 20000, max: Infinity }
];

interface StoreFiltersProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
  searchQuery: string;
  selectedCategory: string;
}

const StoreFilters = ({ 
  onSearchChange, 
  onCategoryChange, 
  onPriceRangeChange,
  searchQuery,
  selectedCategory 
}: StoreFiltersProps) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category.toLowerCase());
  };

  const handlePriceRangeSelect = (range: typeof priceRanges[0]) => {
    setSelectedPriceRange(range.label);
    onPriceRangeChange(range.min, range.max);
  };

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('all');
    onPriceRangeChange(0, Infinity);
    setSelectedPriceRange('');
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search" className="text-base font-medium">Search Products</Label>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="search"
            placeholder="Search tools, hardware..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Categories</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category.toLowerCase() ? "default" : "outline"}
              className={`cursor-pointer hover:bg-bengals-orange hover:text-white ${
                selectedCategory === category.toLowerCase() ? 'bg-bengals-orange' : ''
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Price Range</Label>
        <div className="mt-2 space-y-2">
          {priceRanges.map((range) => (
            <div
              key={range.label}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedPriceRange === range.label 
                  ? 'border-bengals-orange bg-orange-50' 
                  : 'hover:border-gray-300'
              }`}
              onClick={() => handlePriceRangeSelect(range)}
            >
              <span className="text-sm font-medium">{range.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        onClick={clearFilters}
        className="w-full"
      >
        <X className="h-4 w-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FiltersContent />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Filters Button */}
      <div className="lg:hidden mb-4">
        <Button 
          variant="outline" 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Mobile Filters Dropdown */}
      {showMobileFilters && (
        <div className="lg:hidden mb-6">
          <Card>
            <CardContent className="pt-6">
              <FiltersContent />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default StoreFilters;
