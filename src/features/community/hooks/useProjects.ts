
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  estimated_cost: number;
  estimated_time_hours: number;
  materials_list: string[];
  tools_needed: string[];
  steps: { step: number; description: string; image?: string }[];
  images: string[];
  featured: boolean;
  published: boolean;
  likes_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  user_profiles?: {
    display_name: string;
    avatar_url: string;
  };
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          user_profiles (
            display_name,
            avatar_url
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const likeProject = async (projectId: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('project_likes')
        .insert({ project_id: projectId, user_id: userId });

      if (error) {
        console.error('Error liking project:', error);
        toast.error('Failed to like project');
        return false;
      }

      // Update local state
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, likes_count: project.likes_count + 1 }
          : project
      ));

      return true;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to like project');
      return false;
    }
  };

  const unlikeProject = async (projectId: string, userId: string) => {
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

      // Update local state
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, likes_count: Math.max(0, project.likes_count - 1) }
          : project
      ));

      return true;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to unlike project');
      return false;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    fetchProjects,
    likeProject,
    unlikeProject
  };
};
