
import { Link } from 'react-router-dom';

const partners = [
  {
    name: "Lowe's",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Lowes_Companies_Logo.svg",
    description: "Home improvement retailer offering a wide selection of building materials, appliances, tools, and more.",
    website: "https://www.lowes.com",
    discount: "10% off for Standard subscribers, 20% off for Premium subscribers"
  },
  {
    name: "Home Depot",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/TheHomeDepot.svg",
    description: "Leading home improvement supplies retailer providing tools, construction products, and services.",
    website: "https://www.homedepot.com",
    discount: "10% off for Standard subscribers, 20% off for Premium subscribers"
  },
  {
    name: "DeWalt",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/DeWalt_logoA.svg",
    description: "Professional-grade power tools and hand tools for construction and woodworking.",
    website: "https://www.dewalt.com",
    discount: "15% off select power tools for Premium subscribers"
  },
  {
    name: "Sherwin-Williams",
    logo: "https://www.sherwin-williams.com/content/experience-fragments/sherwin/us/en/site/header/master/_jcr_content/root/container/header_copy/logo.coreimg.svg/1656524259268/sw-logo.svg",
    description: "Premium paints and painting supplies for all your DIY needs.",
    website: "https://www.sherwin-williams.com",
    discount: "15% off for all subscribers"
  },
  {
    name: "Lumber Liquidators",
    logo: "https://www.llflooring.com/on/demandware.static/Sites-llf-Site/-/default/dw1658e473/images/logos/LL-Flooring-large.png",
    description: "Hardwood floors, laminate flooring, and vinyl flooring at wholesale prices.",
    website: "https://www.llflooring.com",
    discount: "Free installation tools with $500+ purchase for subscribers"
  },
  {
    name: "Wayfair",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Wayfair_logo.svg",
    description: "Furniture, home decor, and renovation fixtures at competitive prices.",
    website: "https://www.wayfair.com",
    discount: "$50 off $250+ for Premium subscribers"
  }
];

const recommendedTools = [
  {
    name: "Cordless Drill",
    brand: "DeWalt",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: "$129.99",
    rating: 4.8,
    link: "https://www.dewalt.com"
  },
  {
    name: "Compound Miter Saw",
    brand: "DeWalt",
    image: "https://images.unsplash.com/photo-1616046656704-3a473196c447?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    price: "$299.99",
    rating: 4.7,
    link: "https://www.dewalt.com"
  },
  {
    name: "Tool Set (108 piece)",
    brand: "Craftsman",
    image: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    price: "$98.99",
    rating: 4.5,
    link: "https://www.lowes.com"
  },
  {
    name: "Ceramic Tile Cutter",
    brand: "QEP",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
    price: "$89.99",
    rating: 4.3,
    link: "https://www.homedepot.com"
  }
];

const StorePage = () => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 bengals-title">DIY Store & Partners</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the best tools, materials, and exclusive discounts from our trusted partners
          </p>
        </div>

        {/* Recommended Tools */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Recommended Tools for DIYers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedTools.map((tool, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48">
                  <img 
                    src={tool.image} 
                    alt={tool.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{tool.name}</h3>
                  <p className="text-sm text-gray-500">{tool.brand}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-bengals-orange">{tool.price}</span>
                    <div className="flex items-center">
                      <span className="text-sm mr-1">{tool.rating}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#F97316" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                  </div>
                  <a 
                    href={tool.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-3 block text-center bg-bengals-orange text-white py-2 rounded-md hover:bg-orange-500 transition-colors"
                  >
                    View on {tool.brand}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/store/tools" className="text-bengals-orange hover:underline inline-flex items-center">
              View All Recommended Tools
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </Link>
          </div>
        </div>

        {/* Our Partners */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Partners</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-40 h-20 flex items-center justify-center bg-white rounded p-2">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="font-semibold text-lg mb-2">{partner.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{partner.description}</p>
                  <div className="bg-bengals-orange/10 text-bengals-orange text-sm p-2 rounded mb-3">
                    {partner.discount}
                  </div>
                  <a 
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-bengals-orange hover:underline"
                  >
                    Visit Website
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscriber Benefits */}
        <div className="mt-16 bg-bengals-black text-white rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Exclusive Subscriber Benefits</h2>
            <p className="mb-6">
              Our subscribers get special discounts from all our partner stores. Upgrade your membership to save even more on your renovation projects!
            </p>
            <Link to="/pricing">
              <button className="bg-bengals-orange hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-md transition-colors">
                View Subscription Plans
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
