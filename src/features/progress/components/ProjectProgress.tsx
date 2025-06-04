
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Camera, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  image?: string;
}

interface ProjectProgressProps {
  projectId: string;
  projectTitle: string;
  steps: ProjectStep[];
  onStepToggle?: (stepId: string) => void;
  onPhotoUpload?: (stepId: string, photo: File) => void;
}

const ProjectProgress = ({ 
  projectId, 
  projectTitle, 
  steps, 
  onStepToggle, 
  onPhotoUpload 
}: ProjectProgressProps) => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const handleStepToggle = (stepId: string) => {
    onStepToggle?.(stepId);
    toast.success('Progress updated!');
  };

  const handlePhotoUpload = (stepId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoUpload?.(stepId, file);
      toast.success('Photo uploaded!');
    }
  };

  const shareProgress = () => {
    const shareText = `I'm ${Math.round(progressPercentage)}% done with my ${projectTitle} project on DIY Renovation Hub!`;
    if (navigator.share) {
      navigator.share({
        title: 'DIY Project Progress',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Progress shared to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{projectTitle}</h3>
        <Button onClick={shareProgress} variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share Progress
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{completedSteps}/{steps.length} steps completed</span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <p className="text-center text-lg font-semibold mt-2 text-bengals-orange">
          {Math.round(progressPercentage)}% Complete
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <button
                onClick={() => handleStepToggle(step.id)}
                className="mt-1 text-bengals-orange hover:text-orange-500"
              >
                {step.completed ? (
                  <CheckCircle className="h-6 w-6 fill-current" />
                ) : (
                  <Circle className="h-6 w-6" />
                )}
              </button>
              
              <div className="flex-1">
                <h4 className={`font-medium ${step.completed ? 'line-through text-gray-500' : ''}`}>
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                
                {step.image && (
                  <img 
                    src={step.image} 
                    alt={`${step.title} progress`}
                    className="mt-2 h-20 w-20 object-cover rounded border"
                  />
                )}
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(step.id, e)}
                    className="hidden"
                  />
                  <Camera className="h-5 w-5 text-gray-400 hover:text-bengals-orange" />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {progressPercentage === 100 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <h4 className="font-semibold text-green-800 mb-2">🎉 Project Complete!</h4>
          <p className="text-sm text-green-600 mb-3">
            Congratulations! You've completed your {projectTitle} project.
          </p>
          <Button className="bg-green-600 hover:bg-green-700">
            Share Your Success Story
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectProgress;
