
import { Contractor } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContractorCard from './ContractorCard';
import ContractorListItem from './ContractorListItem';

interface ContractorListingProps {
  contractors: Contractor[];
}

const ContractorListing = ({ contractors }: ContractorListingProps) => {
  return (
    <Tabs defaultValue="grid" className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <p className="text-muted-foreground">Showing {contractors.length} contractors</p>
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="grid" className="mt-0">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contractors.map((contractor) => (
            <ContractorCard key={contractor.id} contractor={contractor} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="list" className="mt-0">
        <div className="space-y-4">
          {contractors.map((contractor) => (
            <ContractorListItem key={contractor.id} contractor={contractor} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ContractorListing;
