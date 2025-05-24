
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface Project {
  id: string;
  title: string;
  description: string;
  images?: string[];
  estimated_cost?: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags?: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
  featured?: boolean;
  published?: boolean;
  likes_count?: number;
  views_count?: number;
  estimated_time_hours?: number;
  materials_list?: string[];
  tools_needed?: string[];
  steps?: any[];
  user_profiles?: {
    full_name: string;
    display_name?: string;
    avatar_url?: string;
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
          user_profiles!inner (
            full_name,
            display_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.difficulty) {
        query = query.eq('difficulty_level', filters.difficulty);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }

      return data.map(project => ({
        ...project,
        images: project.images ? (Array.isArray(project.images) ? project.images : [project.images]) : [],
        tags: [],
        featured: project.featured || false,
        likes_count: project.likes_count || 0,
        views_count: project.views_count || 0
      })) as Project[];
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
            title: projectData.title,
            description: projectData.description,
            category: projectData.category,
            difficulty_level: projectData.difficulty_level,
            estimated_cost: projectData.estimated_cost,
            estimated_time_hours: projectData.estimated_time_hours,
            materials_list: projectData.materials_list,
            tools_needed: projectData.tools_needed,
            steps: projectData.steps,
            images: projectData.images,
            featured: projectData.featured || false,
            published: projectData.published || false,
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
          user_profiles!inner (
            full_name,
            display_name,
            avatar_url
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
        images: project.images ? (Array.isArray(project.images) ? project.images : [project.images]) : [],
        tags: [],
        featured: project.featured || false,
        likes_count: project.likes_count || 0,
        views_count: project.views_count || 0,
        author: project.user_profiles?.display_name || project.user_profiles?.full_name || 'Anonymous User'
      })) as (Project & { author: string })[];
    },
    enabled: !!user,
  });
};

// Add like/unlike functionality
export const useLikeProject = () => {
  const queryClient = useQueryClient();

  const likeProject = async (projectId: string, userId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('project_likes')
        .insert([{ project_id: projectId, user_id: userId }]);

      if (error) {
        console.error('Error liking project:', error);
        toast.error('Failed to like project');
        return false;
      }

      // Update likes count
      const { error: updateError } = await supabase
        .from('projects')
        .update({ likes_count: supabase.raw('likes_count + 1') })
        .eq('id', projectId);
      
      if (!updateError) {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        toast.success('Project liked!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const unlikeProject = async (projectId: string, userId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('project_likes')
        .delete()
        .eq('project_id', projectId)
        .eq('user_id', userId);

      if (error) {
        console.error('Error unliking project:', error);
        toast.error('Failed to unlike project');
        return false;
      }

      // Update likes count
      const { error: updateError } = await supabase
        .from('projects')
        .update({ likes_count: supabase.raw('likes_count - 1') })
        .eq('id', projectId);
      
      if (!updateError) {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        toast.success('Project unliked!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  return { likeProject, unlikeProject };
};
