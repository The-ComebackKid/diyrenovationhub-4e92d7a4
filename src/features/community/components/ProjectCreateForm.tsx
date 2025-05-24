
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useForm } from 'react-hook-form';
import { Plus, X, Upload } from 'lucide-react';
import { useCreateProject, CreateProjectData } from '../hooks/useCreateProject';

const categories = [
  'Kitchen', 'Bathroom', 'Bedroom', 'Living Room', 'Outdoor', 'Garden',
  'Furniture', 'Storage', 'Electrical', 'Plumbing', 'Painting', 'Flooring'
];

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

const ProjectCreateForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [materials, setMaterials] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [steps, setSteps] = useState<{ step: number; description: string }[]>([
    { step: 1, description: '' }
  ]);
  const [newMaterial, setNewMaterial] = useState('');
  const [newTool, setNewTool] = useState('');

  const { createProject, loading } = useCreateProject();
  const form = useForm<CreateProjectData>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      difficulty_level: '',
      estimated_cost: 0,
      estimated_time_hours: 0,
      materials_list: [],
      tools_needed: [],
      steps: [],
      images: [],
      published: false
    }
  });

  const addMaterial = () => {
    if (newMaterial.trim()) {
      setMaterials([...materials, newMaterial.trim()]);
      setNewMaterial('');
    }
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const addTool = () => {
    if (newTool.trim()) {
      setTools([...tools, newTool.trim()]);
      setNewTool('');
    }
  };

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps([...steps, { step: steps.length + 1, description: '' }]);
  };

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps.map((step, i) => ({ ...step, step: i + 1 })));
  };

  const updateStep = (index: number, description: string) => {
    const newSteps = [...steps];
    newSteps[index].description = description;
    setSteps(newSteps);
  };

  const onSubmit = async (data: CreateProjectData) => {
    const projectData = {
      ...data,
      materials_list: materials,
      tools_needed: tools,
      steps: steps.filter(step => step.description.trim()),
      images: [], // For now, we'll implement image upload later
    };

    const result = await createProject(projectData);
    if (result && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Share Your DIY Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your project..."
                      className="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="difficulty_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimated_cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Cost ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimated_time_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time (hours)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Materials Section */}
            <div>
              <FormLabel>Materials Needed</FormLabel>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add a material"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                />
                <Button type="button" onClick={addMaterial} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {materials.map((material, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {material}
                    <button
                      type="button"
                      onClick={() => removeMaterial(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tools Section */}
            <div>
              <FormLabel>Tools Required</FormLabel>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add a tool"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTool())}
                />
                <Button type="button" onClick={addTool} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tools.map((tool, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tool}
                    <button
                      type="button"
                      onClick={() => removeTool(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Steps Section */}
            <div>
              <FormLabel>Project Steps</FormLabel>
              <div className="space-y-3 mt-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="w-8 h-8 bg-bengals-orange text-white rounded-full flex items-center justify-center text-sm font-medium mt-1">
                      {step.step}
                    </div>
                    <Textarea
                      placeholder={`Describe step ${step.step}...`}
                      value={step.description}
                      onChange={(e) => updateStep(index, e.target.value)}
                      className="flex-1"
                    />
                    {steps.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeStep(index)}
                        className="mt-1"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addStep} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={loading}
                onClick={() => form.setValue('published', false)}
                variant="outline"
              >
                Save as Draft
              </Button>
              <Button
                type="submit"
                disabled={loading}
                onClick={() => form.setValue('published', true)}
                className="bg-bengals-orange hover:bg-orange-500"
              >
                {loading ? 'Publishing...' : 'Publish Project'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProjectCreateForm;
