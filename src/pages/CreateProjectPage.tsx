
import { useNavigate } from 'react-router-dom';
import ProjectCreateForm from '@/features/community/components/ProjectCreateForm';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bengals-title">Share Your DIY Project</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Inspire others by sharing your DIY project with step-by-step instructions
          </p>
        </div>
        
        <ProjectCreateForm
          onSuccess={() => {
            navigate('/community');
          }}
        />
      </div>
    </div>
  );
};

export default CreateProjectPage;
