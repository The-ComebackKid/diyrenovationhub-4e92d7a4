
import { useState } from 'react';
import StoreGrid from '@/features/store/components/StoreGrid';
import StoreFilters from '@/features/store/components/StoreFilters';
import CartSidebar from '@/features/store/components/CartSidebar';
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Truck, Shield, Award } from 'lucide-react';

const StorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-bengals-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              DIY Store
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Everything you need for your next project - tools, materials, and supplies from trusted brands
            </p>
            <div className="flex justify-center">
              <CartSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Truck className="h-4 w-4 text-bengals-orange" />
              <span>Free Shipping $50+</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-bengals-orange" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Award className="h-4 w-4 text-bengals-orange" />
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <ShoppingBag className="h-4 w-4 text-bengals-orange" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <StoreFilters
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
              onPriceRangeChange={handlePriceRangeChange}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Products' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </h2>
              <p className="text-gray-600">Professional-grade tools and supplies for every project</p>
            </div>
            
            <StoreGrid 
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-bengals-orange text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">Get notified about new products, sales, and DIY tips</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-bengals-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
