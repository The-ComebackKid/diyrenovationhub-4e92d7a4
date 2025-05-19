
import { Star, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Contractor } from '../types';

interface ContractorListItemProps {
  contractor: Contractor;
}

const ContractorListItem = ({ contractor }: ContractorListItemProps) => {
  return (
    <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
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
  );
};

export default ContractorListItem;
