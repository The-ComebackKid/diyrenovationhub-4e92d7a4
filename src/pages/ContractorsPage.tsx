
import { useState } from 'react';
import { useContractors } from '@/features/contractors/hooks/useContractors';
import ContractorSearch from '@/features/contractors/components/ContractorSearch';
import ContractorListing from '@/features/contractors/components/ContractorListing';
import BecomeContractor from '@/features/contractors/components/BecomeContractor';
import ContractorFaqs from '@/features/contractors/components/ContractorFaqs';
import { Contractor } from '@/features/contractors/types';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search } from 'lucide-react';

const ContractorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const { data: contractorsData = [], isLoading, error } = useContractors();

  // Convert database contractors to the expected format
  const contractors: Contractor[] = contractorsData.map(contractor => ({
    id: parseInt(contractor.id.split('-')[0], 16), // Convert UUID to number for compatibility
    name: contractor.name,
    specialty: contractor.specialty,
    location: contractor.location,
    rating: contractor.rating || 0,
    reviews: contractor.reviews_count || 0,
    description: contractor.description || '',
    verified: contractor.verified || false,
    website: contractor.website || '',
    phone: contractor.phone || '',
    image: contractor.image_url || '/placeholder.svg',
  }));

  // Filter contractors based on search and specialty
  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = !searchTerm || 
      contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "all" || contractor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  const handleSearch = () => {
    // Search is handled by the filtering above
  };

  const specialties = [...new Set(contractors.map(c => c.specialty))];

  if (isLoading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bengals-orange mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contractors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600">Error loading contractors. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

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
        <ContractorSearch 
          specialties={specialties}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          handleSearch={handleSearch}
        />

        {/* Show empty state when no contractors are available */}
        {contractors.length === 0 ? (
          <Card className="text-center py-12 mb-8">
            <CardHeader>
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-2xl text-gray-600">No Contractors Available Yet</CardTitle>
              <CardDescription className="text-lg">
                We're building our network of trusted contractors. Be the first to join!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => window.location.href = '/contractor-signup'}
                className="bg-bengals-orange hover:bg-orange-500"
              >
                Become a Contractor
              </Button>
            </CardContent>
          </Card>
        ) : filteredContractors.length === 0 ? (
          <Card className="text-center py-12 mb-8">
            <CardHeader>
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-2xl text-gray-600">No Results Found</CardTitle>
              <CardDescription className="text-lg">
                Try adjusting your search criteria or browse all contractors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty("all");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Contractor Listings */
          <ContractorListing contractors={filteredContractors} />
        )}

        {/* Become a contractor section */}
        <BecomeContractor />

        {/* FAQs */}
        <ContractorFaqs />
      </div>
    </div>
  );
};

export default ContractorsPage;
