
import { useState } from 'react';
import { Search, Filter, ShoppingBag, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

// Sample product data
const productsData = [
  {
    id: 1,
    name: "DIY Ultimate Tool Kit",
    price: 149.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb4dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    category: "Tools",
    bestseller: true,
    description: "Complete set of essential DIY tools for any home renovation project."
  },
  {
    id: 2,
    name: "Home Renovation Guide Book",
    price: 24.99,
    rating: 4.5,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    category: "Books",
    bestseller: false,
    description: "Step-by-step guide for planning and executing home renovation projects."
  },
  {
    id: 3,
    name: "Premium Paint Brush Set",
    price: 34.95,
    rating: 4.7,
    reviews: 62,
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Painting",
    bestseller: false,
    description: "High-quality brushes for smooth and professional paint application."
  },
  {
    id: 4,
    name: "Digital Measuring Tape",
    price: 29.99,
    rating: 4.6,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1588495077262-8836ce12abbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    category: "Tools",
    bestseller: true,
    description: "Precise digital measurements with memory function and unit conversion."
  },
  {
    id: 5,
    name: "Cordless Power Drill",
    price: 89.99,
    rating: 4.9,
    reviews: 158,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2078&q=80",
    category: "Tools",
    bestseller: true,
    description: "Powerful 20V cordless drill with long battery life and multiple settings."
  },
  {
    id: 6,
    name: "Wall Repair Kit",
    price: 19.95,
    rating: 4.3,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1602928298849-325cec8771c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    category: "Materials",
    bestseller: false,
    description: "Everything you need to repair small holes and cracks in drywall."
  },
  {
    id: 7,
    name: "Tile Installation Set",
    price: 54.95,
    rating: 4.6,
    reviews: 29,
    image: "https://images.unsplash.com/photo-1607400201515-c2c41c07d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Tools",
    bestseller: false,
    description: "Complete kit for professional tile installation, including spacers and float."
  },
  {
    id: 8,
    name: "Home Plumbing Handbook",
    price: 18.99,
    rating: 4.4,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    category: "Books",
    bestseller: false,
    description: "DIY guide to understanding and fixing common household plumbing issues."
  }
];

const StorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  const [products, setProducts] = useState(productsData);
  const [cartItems, setCartItems] = useState<number[]>([]);

  const handleAddToCart = (productId: number) => {
    setCartItems([...cartItems, productId]);
    toast({
      title: "Added to cart",
      description: "Item has been added to your shopping cart",
    });
  };

  const handleApplyFilters = () => {
    let filtered = productsData;
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    switch (sortBy) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "bestseller":
        filtered = [...filtered].sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
      default:
        // Default sort: recommended (no specific sort)
        break;
    }
    
    setProducts(filtered);
  };

  const categories = [...new Set(productsData.map(product => product.category))];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">DIY Shop</h1>
        <p className="text-muted-foreground">
          Quality tools and materials for your renovation projects
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="bg-card rounded-lg border p-4">
            <h2 className="font-semibold mb-4">Filters</h2>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Category</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="all-categories" 
                    name="category"
                    checked={selectedCategory === ""}
                    onChange={() => setSelectedCategory("")}
                    className="mr-2"
                  />
                  <label htmlFor="all-categories" className="text-sm">All Categories</label>
                </div>
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`category-${category}`}
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category}`} className="text-sm">{category}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  min={0}
                  max={200}
                  step={5}
                  onValueChange={(value) => setPriceRange(value as number[])}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <Button onClick={handleApplyFilters} className="w-full bg-bengals-orange hover:bg-orange-600">
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleApplyFilters()}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="bestseller">Bestsellers</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden bg-card rounded-lg border p-4 mb-6">
              <h2 className="font-semibold mb-4">Filters</h2>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Category</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="mob-all-categories" 
                      name="mob-category"
                      checked={selectedCategory === ""}
                      onChange={() => setSelectedCategory("")}
                      className="mr-2"
                    />
                    <label htmlFor="mob-all-categories" className="text-sm">All Categories</label>
                  </div>
                  {categories.map(category => (
                    <div key={`mob-${category}`} className="flex items-center">
                      <input 
                        type="radio" 
                        id={`mob-category-${category}`}
                        name="mob-category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="mr-2"
                      />
                      <label htmlFor={`mob-category-${category}`} className="text-sm">{category}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={200}
                    step={5}
                    onValueChange={(value) => setPriceRange(value as number[])}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleApplyFilters} className="w-full bg-bengals-orange hover:bg-orange-600">
                Apply Filters
              </Button>
            </div>
          )}

          {/* Cart indicator */}
          {cartItems.length > 0 && (
            <div className="bg-bengals-orange/10 text-bengals-orange p-4 rounded-lg mb-6 flex justify-between items-center">
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                <span>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart</span>
              </div>
              <Button size="sm" variant="outline" className="border-bengals-orange text-bengals-orange hover:bg-bengals-orange hover:text-white">
                View Cart
              </Button>
            </div>
          )}
          
          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    {product.bestseller && (
                      <Badge className="absolute top-2 right-2 bg-bengals-orange">
                        Bestseller
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <p className="font-semibold">${product.price.toFixed(2)}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-yellow-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star 
                            key={index} 
                            size={16} 
                            className={index < Math.floor(product.rating) ? "fill-yellow-500" : "fill-gray-200"}
                          />
                        ))}
                      </div>
                      <span className="text-xs ml-2 text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleAddToCart(product.id)} 
                      className="w-full bg-bengals-orange hover:bg-orange-600"
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground mb-2">No products found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setPriceRange([0, 200]);
                  setProducts(productsData);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
