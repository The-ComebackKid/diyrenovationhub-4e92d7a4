
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  budget?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
  user_profiles?: {
    full_name: string;
  } | null;
}

export const useProjects = (filters?: {
  category?: string;
  difficulty?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select(`
          *,
          user_profiles (
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }

      return data as Project[];
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
      if (!user) throw new Error('User must be authenticated');

      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            ...projectData,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully!');
    },
    onError: (error: Error) => {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
    },
  });
};

export const useUserProjects = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-projects', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          user_profiles (
            full_name
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user projects:', error);
        throw error;
      }

      return data.map(project => ({
        ...project,
        author: project.user_profiles?.full_name || 'Anonymous User'
      })) as (Project & { author: string })[];
    },
    enabled: !!user,
  });
};
