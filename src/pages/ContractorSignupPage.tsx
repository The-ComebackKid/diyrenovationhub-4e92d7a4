
import { useState } from 'react';
import { useCreateContractorProfile } from '@/features/contractors/hooks/useContractors';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, CheckCircle } from 'lucide-react';
import { toast } from "sonner";

const ContractorSignupPage = () => {
  const createContractorProfile = useCreateContractorProfile();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    location: '',
    description: '',
    website: '',
    phone: '',
    image_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.specialty || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await createContractorProfile.mutateAsync(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error creating contractor profile:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-700">Application Submitted!</CardTitle>
              <CardDescription>
                Thank you for applying to become a contractor. We'll review your application and get back to you within 2-3 business days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.location.href = '/contractors'}>
                Back to Contractors
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Building className="h-12 w-12 text-bengals-orange mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Join Our Contractor Network</h1>
          <p className="text-gray-600 mt-2">
            Connect with homeowners looking for trusted professionals
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contractor Application</CardTitle>
            <CardDescription>
              Fill out the form below to apply to be listed as a contractor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Business Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your business name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specialty">Specialty *</Label>
                  <Input
                    id="specialty"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    placeholder="e.g., Plumbing, Electrical, Roofing"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, State"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <Label htmlFor="image_url">Profile Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/your-image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell potential customers about your services..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-bengals-orange hover:bg-orange-500"
                disabled={createContractorProfile.isPending}
              >
                {createContractorProfile.isPending ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContractorSignupPage;
