
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, DollarSign } from 'lucide-react';

interface AffiliateProduct {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  image: string;
  affiliateUrl: string;
  store: 'lowes' | 'homedepot' | 'amazon';
  description: string;
  category: string;
}

interface AffiliateLinksProps {
  products: AffiliateProduct[];
  title?: string;
  maxItems?: number;
}

const sampleProducts: AffiliateProduct[] = [
  {
    id: '1',
    name: 'DEWALT 20V MAX Cordless Drill',
    price: '$79.99',
    originalPrice: '$99.99',
    rating: 4.5,
    reviewCount: 1234,
    image: 'https://images.unsplash.com/photo-1567357502214-dd13f3512478?w=300&h=300&fit=crop',
    affiliateUrl: 'https://www.homedepot.com/p/DEWALT-20V-MAX-Cordless-Drill',
    store: 'homedepot',
    description: 'Professional grade cordless drill perfect for DIY projects',
    category: 'Tools'
  },
  {
    id: '2',
    name: 'Behr Premium Paint & Primer',
    price: '$34.99',
    rating: 4.3,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&h=300&fit=crop',
    affiliateUrl: 'https://www.homedepot.com/p/BEHR-Premium-Paint',
    store: 'homedepot',
    description: 'High-quality paint and primer in one for interior projects',
    category: 'Paint'
  },
  {
    id: '3',
    name: 'Kreg Pocket Hole Jig',
    price: '$39.99',
    rating: 4.7,
    reviewCount: 890,
    image: 'https://images.unsplash.com/photo-1609205172717-2f3bb5b7b8b8?w=300&h=300&fit=crop',
    affiliateUrl: 'https://www.lowes.com/pd/Kreg-Pocket-Hole-Jig',
    store: 'lowes',
    description: 'Essential tool for strong wood joints in furniture projects',
    category: 'Tools'
  }
];

const AffiliateLinks = ({ 
  products = sampleProducts, 
  title = "Recommended Tools & Materials",
  maxItems = 6 
}: AffiliateLinksProps) => {
  const getStoreColor = (store: string) => {
    switch (store) {
      case 'homedepot': return 'text-orange-600';
      case 'lowes': return 'text-blue-600';
      case 'amazon': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStoreName = (store: string) => {
    switch (store) {
      case 'homedepot': return 'Home Depot';
      case 'lowes': return 'Lowe\'s';
      case 'amazon': return 'Amazon';
      default: return store;
    }
  };

  const displayProducts = products.slice(0, maxItems);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold bengals-title">{title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>Affiliate partners</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="relative mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              {product.originalPrice && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  SALE
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.reviewCount})</span>
              </div>

              <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-bengals-orange">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>
                <span className={`text-xs font-medium ${getStoreColor(product.store)}`}>
                  {getStoreName(product.store)}
                </span>
              </div>

              <Button 
                asChild 
                size="sm" 
                className="w-full bg-bengals-orange hover:bg-orange-500"
              >
                <a 
                  href={product.affiliateUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  View Product
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          <strong>Disclosure:</strong> We earn a commission from qualifying purchases made through affiliate links. 
          This helps support our free content and community at no extra cost to you.
        </p>
      </div>
    </div>
  );
};

export default AffiliateLinks;
