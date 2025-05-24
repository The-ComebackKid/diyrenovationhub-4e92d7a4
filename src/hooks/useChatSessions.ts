
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  user_id: string;
  title: string | null;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export const useChatSessions = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['chat-sessions', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching chat sessions:', error);
        throw error;
      }

      return data.map(session => ({
        ...session,
        messages: Array.isArray(session.messages) ? session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })) : []
      })) as ChatSession[];
    },
    enabled: !!user,
  });
};

export const useCreateChatSession = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ title, initialMessage }: { title?: string; initialMessage?: ChatMessage }) => {
      if (!user) throw new Error('User not authenticated');

      const messages = initialMessage ? [initialMessage] : [];

      const { data, error } = await supabase
        .from('chat_sessions')
        .insert([
          {
            user_id: user.id,
            title: title || 'New Chat',
            messages: JSON.stringify(messages),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return {
        ...data,
        messages: messages
      } as ChatSession;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-sessions'] });
    },
    onError: (error) => {
      console.error('Error creating chat session:', error);
      toast.error('Failed to create chat session');
    },
  });
};

export const useUpdateChatSession = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, messages, title }: { id: string; messages?: ChatMessage[]; title?: string }) => {
      if (!user) throw new Error('User not authenticated');

      const updateData: any = { updated_at: new Date().toISOString() };
      
      if (messages) {
        updateData.messages = JSON.stringify(messages);
      }
      
      if (title) {
        updateData.title = title;
      }

      const { data, error } = await supabase
        .from('chat_sessions')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-sessions'] });
    },
    onError: (error) => {
      console.error('Error updating chat session:', error);
      toast.error('Failed to update chat session');
    },
  });
};
