
import { useState } from 'react';
import { contractorsData } from '@/features/contractors/data/contractorsData';
import ContractorSearch from '@/features/contractors/components/ContractorSearch';
import ContractorListing from '@/features/contractors/components/ContractorListing';
import BecomeContractor from '@/features/contractors/components/BecomeContractor';
import ContractorFaqs from '@/features/contractors/components/ContractorFaqs';

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
        <ContractorSearch 
          specialties={specialties}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          handleSearch={handleSearch}
        />

        {/* Contractor Listings */}
        <ContractorListing contractors={filteredContractors} />

        {/* Become a contractor section */}
        <BecomeContractor />

        {/* FAQs */}
        <ContractorFaqs />
      </div>
    </div>
  );
};

export default ContractorsPage;
