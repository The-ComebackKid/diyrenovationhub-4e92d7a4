
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMyContractorProfile, useCreateContractorProfile, useUpdateContractorProfile } from '@/features/contractors/hooks/useContractors';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building, User, Settings } from 'lucide-react';
import { toast } from "sonner";

const ProfilePage = () => {
  const { user } = useAuth();
  const { data: contractorProfile, isLoading } = useMyContractorProfile();
  const createContractorProfile = useCreateContractorProfile();
  const updateContractorProfile = useUpdateContractorProfile();

  const [contractorForm, setContractorForm] = useState({
    name: '',
    specialty: '',
    location: '',
    description: '',
    website: '',
    phone: '',
    image_url: ''
  });

  const [userForm, setUserForm] = useState({
    full_name: user?.user_metadata?.full_name || '',
    email: user?.email || ''
  });

  const handleContractorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contractorForm.name || !contractorForm.specialty || !contractorForm.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (contractorProfile) {
        await updateContractorProfile.mutateAsync({
          id: contractorProfile.id,
          ...contractorForm
        });
      } else {
        await createContractorProfile.mutateAsync(contractorForm);
      }
      
      // Reset form
      setContractorForm({
        name: '',
        specialty: '',
        location: '',
        description: '',
        website: '',
        phone: '',
        image_url: ''
      });
    } catch (error) {
      console.error('Error saving contractor profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bengals-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your account and contractor profile</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="contractor" className="flex items-center gap-2">
              <Building size={16} />
              Contractor
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-bengals-orange text-white text-lg">
                      {user?.user_metadata?.full_name ? 
                        user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 
                        user?.email?.[0]?.toUpperCase()
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{user?.user_metadata?.full_name || 'User'}</h3>
                    <p className="text-gray-500">{user?.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={userForm.full_name}
                      onChange={(e) => setUserForm({ ...userForm, full_name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userForm.email}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contractor">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Contractor Profile</CardTitle>
                    <CardDescription>
                      {contractorProfile ? 'Update your contractor profile' : 'Create your contractor profile to get listed'}
                    </CardDescription>
                  </div>
                  {contractorProfile && (
                    <div className="flex gap-2">
                      {contractorProfile.verified ? (
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      ) : (
                        <Badge variant="outline">Pending Verification</Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContractorSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Business Name *</Label>
                      <Input
                        id="name"
                        value={contractorForm.name}
                        onChange={(e) => setContractorForm({ ...contractorForm, name: e.target.value })}
                        placeholder="Your business name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialty">Specialty *</Label>
                      <Input
                        id="specialty"
                        value={contractorForm.specialty}
                        onChange={(e) => setContractorForm({ ...contractorForm, specialty: e.target.value })}
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
                        value={contractorForm.location}
                        onChange={(e) => setContractorForm({ ...contractorForm, location: e.target.value })}
                        placeholder="City, State"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={contractorForm.phone}
                        onChange={(e) => setContractorForm({ ...contractorForm, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={contractorForm.website}
                      onChange={(e) => setContractorForm({ ...contractorForm, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image_url">Profile Image URL</Label>
                    <Input
                      id="image_url"
                      value={contractorForm.image_url}
                      onChange={(e) => setContractorForm({ ...contractorForm, image_url: e.target.value })}
                      placeholder="https://example.com/your-image.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={contractorForm.description}
                      onChange={(e) => setContractorForm({ ...contractorForm, description: e.target.value })}
                      placeholder="Tell potential customers about your services..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-bengals-orange hover:bg-orange-500"
                    disabled={createContractorProfile.isPending || updateContractorProfile.isPending}
                  >
                    {createContractorProfile.isPending || updateContractorProfile.isPending 
                      ? 'Saving...' 
                      : contractorProfile 
                        ? 'Update Profile' 
                        : 'Create Profile'
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Subscription</h3>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Free Plan</p>
                      <p className="text-sm text-gray-500">Basic features included</p>
                    </div>
                    <Button variant="outline">
                      Upgrade
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Email notifications</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Marketing emails</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
