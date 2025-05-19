
import { Building } from 'lucide-react';
import { Button } from "@/components/ui/button";

const BecomeContractor = () => {
  return (
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
  );
};

export default BecomeContractor;
