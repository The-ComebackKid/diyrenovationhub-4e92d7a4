
import { useState } from 'react';
import { Search, MapPin, Star, Filter, Building } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample contractor data
const contractorsData = [
  {
    id: 1,
    name: "Johnson Home Renovations",
    specialty: "Kitchen & Bath",
    location: "Cincinnati, OH",
    rating: 4.8,
    reviews: 124,
    description: "Specializing in high-end kitchen and bathroom renovations with over 15 years of experience.",
    verified: true,
    website: "https://johnsonrenovations.example.com",
    phone: "(513) 555-1234",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    name: "Smith & Sons Construction",
    specialty: "Full Home Remodels",
    location: "Dayton, OH",
    rating: 4.6,
    reviews: 89,
    description: "Family-owned business specializing in complete home renovations and additions.",
    verified: true,
    website: "https://smithandsons.example.com",
    phone: "(513) 555-5678",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    name: "Elite Flooring Pros",
    specialty: "Flooring",
    location: "Columbus, OH",
    rating: 4.9,
    reviews: 56,
    description: "Experts in hardwood, tile, vinyl, and carpet flooring installation and refinishing.",
    verified: true,
    website: "https://eliteflooring.example.com",
    phone: "(614) 555-9012",
    image: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
  },
  {
    id: 4,
    name: "Allstar Plumbing & Electric",
    specialty: "Plumbing & Electrical",
    location: "Lexington, KY",
    rating: 4.7,
    reviews: 112,
    description: "Licensed plumbers and electricians for all your repair and installation needs.",
    verified: true,
    website: "https://allstarplumbelectric.example.com",
    phone: "(859) 555-3456",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
  },
  {
    id: 5,
    name: "Green Landscaping & Decks",
    specialty: "Outdoor & Landscaping",
    location: "Indianapolis, IN",
    rating: 4.5,
    reviews: 78,
    description: "Transforming outdoor spaces with custom deck building, landscaping, and outdoor kitchens.",
    verified: false,
    website: "https://greenlandscaping.example.com",
    phone: "(317) 555-7890",
    image: "https://images.unsplash.com/photo-1598903678053-af2bf615bcef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 6,
    name: "Precision Painting Plus",
    specialty: "Painting & Drywall",
    location: "Cincinnati, OH",
    rating: 4.7,
    reviews: 94,
    description: "Interior and exterior painting services with meticulous attention to detail.",
    verified: true,
    website: "https://precisionpainting.example.com",
    phone: "(513) 555-2345",
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  }
];

const ContractorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [filteredContractors, setFilteredContractors] = useState(contractorsData);

  const handleSearch = () => {
    let results = contractorsData;
    
    if (searchTerm) {
      results = results.filter(contractor => 
        contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contractor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contractor.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSpecialty && selectedSpecialty !== "all") {
      results = results.filter(contractor => 
        contractor.specialty === selectedSpecialty
      );
    }
    
    setFilteredContractors(results);
  };

  const specialties = [...new Set(contractorsData.map(c => c.specialty))];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Find Trusted Contractors</h1>
          <p className="text-muted-foreground">
            Connect with pre-screened professionals for projects you don't want to DIY
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-muted rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Input
                placeholder="Search by name, service, or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty (Any)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Specialty</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={handleSearch} className="bg-bengals-orange hover:bg-orange-600">
              <Filter className="mr-2 h-4 w-4" /> Filter Results
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Looking to list your business here? <a href="/contractor-signup" className="text-bengals-orange hover:underline">Sign up as a contractor</a></p>
          </div>
        </div>

        {/* Contractor Listings */}
        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-muted-foreground">Showing {filteredContractors.length} contractors</p>
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContractors.map((contractor) => (
                <Card key={contractor.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={contractor.image} 
                      alt={contractor.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-xl">{contractor.name}</CardTitle>
                      {contractor.verified && (
                        <div className="bg-bengals-orange text-white text-xs px-2 py-1 rounded-full">
                          Verified
                        </div>
                      )}
                    </div>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> {contractor.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center mb-2">
                      <div className="bg-bengals-orange/10 text-bengals-orange px-2 py-1 rounded text-sm">
                        {contractor.specialty}
                      </div>
                      <div className="ml-auto flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-medium">{contractor.rating}</span>
                        <span className="text-sm text-muted-foreground ml-1">({contractor.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {contractor.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <a 
                      href={contractor.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-bengals-orange hover:underline text-sm"
                    >
                      Visit Website
                    </a>
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {filteredContractors.map((contractor) => (
                <div key={contractor.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <img 
                      src={contractor.image} 
                      alt={contractor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">{contractor.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" /> {contractor.location}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {contractor.verified && (
                          <div className="bg-bengals-orange text-white text-xs px-2 py-1 rounded-full mb-1">
                            Verified
                          </div>
                        )}
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-medium">{contractor.rating}</span>
                          <span className="text-sm text-muted-foreground ml-1">({contractor.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="bg-bengals-orange/10 text-bengals-orange px-2 py-1 rounded text-sm inline-block">
                        {contractor.specialty}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {contractor.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <div>
                        <p className="text-sm">{contractor.phone}</p>
                        <a 
                          href={contractor.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-bengals-orange hover:underline text-sm"
                        >
                          Visit Website
                        </a>
                      </div>
                      <Button>
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Become a contractor section */}
        <div className="bg-bengals-black text-white rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <Building size={48} />
            </div>
            <div className="md:flex-1">
              <h2 className="text-2xl font-semibold mb-2">Are you a contractor?</h2>
              <p className="mb-4">List your business in our directory and connect with homeowners looking for professional help.</p>
              <ul className="list-disc list-inside mb-6 text-sm">
                <li>Reach thousands of potential customers</li>
                <li>Showcase your portfolio and specialties</li>
                <li>Receive direct inquiries from interested homeowners</li>
              </ul>
              <div className="flex space-x-4">
                <Button className="bg-bengals-orange hover:bg-orange-600">
                  Get Listed
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">How are contractors verified?</h3>
              <p className="text-sm text-muted-foreground">All verified contractors undergo background checks, license verification, and review of past projects. We also collect and verify customer testimonials.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">What does it cost to hire a contractor through DIY RenovationHub?</h3>
              <p className="text-sm text-muted-foreground">There's no additional fee to hire contractors through our platform. We simply connect you with qualified professionals, and you work with them directly.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Can I leave reviews for contractors I've hired?</h3>
              <p className="text-sm text-muted-foreground">Yes! After your project is complete, you'll be able to rate and review the contractor. Your feedback helps maintain quality standards in our community.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorsPage;
