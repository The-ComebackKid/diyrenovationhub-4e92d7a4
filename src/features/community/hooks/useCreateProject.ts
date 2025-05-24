
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export interface CreateProjectData {
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  estimated_cost?: number;
  estimated_time_hours?: number;
  materials_list: string[];
  tools_needed: string[];
  steps: { step: number; description: string; image?: string }[];
  images: string[];
  published: boolean;
}

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createProject = async (projectData: CreateProjectData) => {
    if (!user) {
      toast.error('You must be logged in to create a project');
      return null;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...projectData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        toast.error('Failed to create project');
        return null;
      }

      toast.success('Project created successfully!');
      return data;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create project');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    loading
  };
};
