
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  experience_level: string | null;
  specialties: string[] | null;
  projects_completed: number;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  experience_level?: string;
  specialties?: string[];
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
        return;
      }

      if (data) {
        setProfile({
          ...data,
          specialties: Array.isArray(data.specialties) ? data.specialties as string[] : null
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: UpdateProfileData) => {
    if (!user) {
      toast.error('You must be logged in to update your profile');
      return false;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert([{
          user_id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
        return false;
      }

      setProfile({
        ...data,
        specialties: Array.isArray(data.specialties) ? data.specialties as string[] : null
      });
      toast.success('Profile updated successfully!');
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    fetchProfile
  };
};
