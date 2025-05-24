
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, ExternalLink } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  brand: string;
  affiliate_url: string;
  stock_quantity: number;
  rating: number;
  review_count: number;
  featured: boolean;
  active: boolean;
}

interface StoreGridProps {
  searchQuery?: string;
  selectedCategory?: string;
}

const StoreGrid = ({ searchQuery = '', selectedCategory = 'all' }: StoreGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('active', true);

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      toast.error('Please log in to add items to cart');
      return;
    }

    setCart([...cart, product.id]);
    toast.success(`${product.name} added to cart!`);
  };

  const handleViewAffiliate = (product: Product) => {
    if (product.affiliate_url) {
      window.open(product.affiliate_url, '_blank');
      toast.success('Redirecting to retailer...');
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative">
            <img 
              src={product.image_url || '/placeholder.svg'} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-bengals-orange">
                Featured
              </Badge>
            )}
            {product.stock_quantity === 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500">
                Out of Stock
              </Badge>
            )}
            {product.brand && (
              <Badge variant="outline" className="absolute bottom-2 left-2 bg-white/90">
                {product.brand}
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
              {product.rating > 0 && (
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{product.rating.toFixed(1)}</span>
                  <span className="ml-1">({product.review_count})</span>
                </div>
              )}
            </div>
            {product.stock_quantity > 0 && product.stock_quantity <= 10 && (
              <p className="text-sm text-orange-600 font-medium">
                Only {product.stock_quantity} left in stock!
              </p>
            )}
          </CardContent>
          
          <CardFooter className="space-y-2">
            <Button 
              className="w-full bg-bengals-orange hover:bg-orange-500"
              onClick={() => handleAddToCart(product)}
              disabled={product.stock_quantity === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            {product.affiliate_url && (
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => handleViewAffiliate(product)}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View at Retailer
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
      
      {filteredProducts.length === 0 && !loading && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StoreGrid;
