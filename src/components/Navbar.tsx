
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Book, Users, MessageCircle, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background sticky top-0 z-40 w-full border-b border-border shadow-sm backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-bengals-orange rounded-md p-1">
              <span className="text-white font-bold text-xl">DIY</span>
            </div>
            <span className="bengals-title text-xl">RenovationHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-bengals-orange transition-colors">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/blog" className="flex items-center space-x-1 hover:text-bengals-orange transition-colors">
              <Book size={18} />
              <span>Blog</span>
            </Link>
            <Link to="/community" className="flex items-center space-x-1 hover:text-bengals-orange transition-colors">
              <Users size={18} />
              <span>Community</span>
            </Link>
            <Link to="/chat" className="flex items-center space-x-1 hover:text-bengals-orange transition-colors">
              <MessageCircle size={18} />
              <span>Chat</span>
            </Link>
            <Link to="/store" className="flex items-center space-x-1 hover:text-bengals-orange transition-colors">
              <ShoppingBag size={18} />
              <span>Store</span>
            </Link>
          </div>

          {/* Login/Subscribe Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/pricing">
              <Button className="bg-bengals-orange hover:bg-orange-500">Subscribe</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-bengals-orange"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link 
              to="/" 
              className="flex items-center space-x-2 hover:text-bengals-orange transition-colors p-2"
              onClick={() => setIsOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/blog" 
              className="flex items-center space-x-2 hover:text-bengals-orange transition-colors p-2"
              onClick={() => setIsOpen(false)}
            >
              <Book size={18} />
              <span>Blog</span>
            </Link>
            <Link 
              to="/community" 
              className="flex items-center space-x-2 hover:text-bengals-orange transition-colors p-2"
              onClick={() => setIsOpen(false)}
            >
              <Users size={18} />
              <span>Community</span>
            </Link>
            <Link 
              to="/chat" 
              className="flex items-center space-x-2 hover:text-bengals-orange transition-colors p-2"
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle size={18} />
              <span>Chat</span>
            </Link>
            <Link 
              to="/store" 
              className="flex items-center space-x-2 hover:text-bengals-orange transition-colors p-2"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag size={18} />
              <span>Store</span>
            </Link>
            <div className="flex items-center space-x-2 pt-2">
              <Link to="/login" className="w-1/2">
                <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>Login</Button>
              </Link>
              <Link to="/pricing" className="w-1/2">
                <Button className="w-full bg-bengals-orange hover:bg-orange-500" onClick={() => setIsOpen(false)}>Subscribe</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
