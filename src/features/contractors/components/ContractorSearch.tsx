
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContractorSearchProps {
  specialties: string[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
  handleSearch: () => void;
}

const ContractorSearch = ({ 
  specialties, 
  searchTerm, 
  setSearchTerm, 
  selectedSpecialty, 
  setSelectedSpecialty, 
  handleSearch 
}: ContractorSearchProps) => {
  return (
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
  );
};

export default ContractorSearch;
