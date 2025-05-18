
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-bengals-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded-md p-1">
                <span className="text-bengals-orange font-bold text-xl">DIY</span>
              </div>
              <span className="bengals-title text-xl">RenovationHub</span>
            </div>
            <p className="text-sm">Your one-stop resource for DIY home renovation projects, expert advice, and a supportive community of fellow DIY enthusiasts.</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-bengals-orange">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-bengals-orange transition-colors">Home</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-bengals-orange transition-colors">Blog</Link></li>
              <li><Link to="/community" className="text-sm hover:text-bengals-orange transition-colors">Community</Link></li>
              <li><Link to="/chat" className="text-sm hover:text-bengals-orange transition-colors">Chat Assistant</Link></li>
              <li><Link to="/store" className="text-sm hover:text-bengals-orange transition-colors">Store</Link></li>
            </ul>
          </div>

          {/* Partner links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-bengals-orange">Our Partners</h3>
            <ul className="space-y-2">
              <li><a href="https://www.lowes.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-bengals-orange transition-colors">Lowe's</a></li>
              <li><a href="https://www.homedepot.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-bengals-orange transition-colors">Home Depot</a></li>
              <li><a href="https://www.dewalt.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-bengals-orange transition-colors">DeWalt Power Tools</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-bengals-orange">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm">Email: contact@diyrenovationhub.com</li>
              <li className="text-sm">Phone: (555) 123-4567</li>
              <li className="text-sm font-semibold text-bengals-orange">Emergency Help: Available 24/7 for subscribers</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} DIY RenovationHub. All Rights Reserved.</p>
          <p className="mt-2">Your one-stop place for DIY renovation projects</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
