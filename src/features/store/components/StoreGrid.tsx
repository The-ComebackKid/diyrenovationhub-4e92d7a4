
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from 'lucide-react';
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Professional Drill Set',
    description: 'Complete 18V cordless drill set with multiple bits and battery',
    price: 12999,
    image: '/placeholder.svg',
    category: 'Tools',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Paint Roller Kit',
    description: 'Professional grade paint roller with extension pole and multiple sleeves',
    price: 2999,
    image: '/placeholder.svg',
    category: 'Painting',
    rating: 4.5,
    reviews: 89,
    inStock: true
  },
  {
    id: '3',
    name: 'LED Work Light',
    description: 'Bright LED work light with adjustable stand, perfect for any project',
    price: 4999,
    image: '/placeholder.svg',
    category: 'Lighting',
    rating: 4.7,
    reviews: 156,
    inStock: true
  },
  {
    id: '4',
    name: 'Safety Glasses Set',
    description: 'ANSI certified safety glasses with anti-fog coating',
    price: 1999,
    image: '/placeholder.svg',
    category: 'Safety',
    rating: 4.6,
    reviews: 78,
    inStock: true
  },
  {
    id: '5',
    name: 'Tool Belt Pro',
    description: 'Heavy-duty leather tool belt with multiple pockets and hammer loop',
    price: 5999,
    image: '/placeholder.svg',
    category: 'Storage',
    rating: 4.9,
    reviews: 203,
    inStock: false
  },
  {
    id: '6',
    name: 'Measuring Tape 25ft',
    description: 'Professional grade measuring tape with magnetic tip and standout',
    price: 2499,
    image: '/placeholder.svg',
    category: 'Measuring',
    rating: 4.4,
    reviews: 67,
    inStock: true
  }
];

interface StoreGridProps {
  searchQuery?: string;
  selectedCategory?: string;
}

const StoreGrid = ({ searchQuery = '', selectedCategory = 'all' }: StoreGridProps) => {
  const [cart, setCart] = useState<string[]>([]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (productId: string, productName: string) => {
    setCart([...cart, productId]);
    toast.success(`${productName} added to cart!`);
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-bengals-orange">
                Featured
              </Badge>
            )}
            {!product.inStock && (
              <Badge className="absolute top-2 right-2 bg-red-500">
                Out of Stock
              </Badge>
            )}
          </div>
          
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>
            <CardDescription className="text-sm">
              {product.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-bengals-orange">
                {formatPrice(product.price)}
              </span>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium">{product.rating}</span>
                <span className="ml-1">({product.reviews})</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              className="w-full bg-bengals-orange hover:bg-orange-500"
              onClick={() => handleAddToCart(product.id, product.name)}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StoreGrid;
