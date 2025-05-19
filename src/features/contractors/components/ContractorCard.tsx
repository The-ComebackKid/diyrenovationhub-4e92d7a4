
import { Star } from 'lucide-react';
import { Contractor } from '../types';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from 'lucide-react';

interface ContractorCardProps {
  contractor: Contractor;
}

const ContractorCard = ({ contractor }: ContractorCardProps) => {
  return (
    <Card className="overflow-hidden">
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
  );
};

export default ContractorCard;
