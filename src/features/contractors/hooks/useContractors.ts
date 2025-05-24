
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface DatabaseContractor {
  id: string;
  user_id: string | null;
  name: string;
  specialty: string;
  location: string;
  rating: number | null;
  reviews_count: number | null;
  description: string | null;
  verified: boolean | null;
  website: string | null;
  phone: string | null;
  image_url: string | null;
  monthly_fee_paid: boolean | null;
  fee_due_date: string | null;
  created_at: string;
  updated_at: string;
}

export const useContractors = () => {
  return useQuery({
    queryKey: ['contractors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contractors')
        .select('*')
        .eq('verified', true)
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching contractors:', error);
        throw error;
      }

      return data as DatabaseContractor[];
    },
  });
};

export const useMyContractorProfile = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['my-contractor-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('contractors')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching contractor profile:', error);
        throw error;
      }

      return data as DatabaseContractor | null;
    },
    enabled: !!user,
  });
};

export const useCreateContractorProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (profileData: Partial<DatabaseContractor>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('contractors')
        .insert([
          {
            user_id: user.id,
            ...profileData,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contractors'] });
      queryClient.invalidateQueries({ queryKey: ['my-contractor-profile'] });
      toast.success('Contractor profile created successfully!');
    },
    onError: (error) => {
      console.error('Error creating contractor profile:', error);
      toast.error('Failed to create contractor profile');
    },
  });
};

export const useUpdateContractorProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, ...profileData }: Partial<DatabaseContractor> & { id: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('contractors')
        .update(profileData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contractors'] });
      queryClient.invalidateQueries({ queryKey: ['my-contractor-profile'] });
      toast.success('Contractor profile updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating contractor profile:', error);
      toast.error('Failed to update contractor profile');
    },
  });
};
