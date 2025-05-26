
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const ToolChecklist = () => {
  const [projectType, setProjectType] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [checkedTools, setCheckedTools] = useState<string[]>([]);

  const toolLists = {
    painting: {
      beginner: ['Paint brushes', 'Paint roller', 'Paint tray', 'Drop cloths', 'Painter\'s tape', 'Ladder'],
      intermediate: ['Paint brushes', 'Paint roller', 'Paint tray', 'Drop cloths', 'Painter\'s tape', 'Ladder', 'Paint sprayer', 'Sandpaper', 'Primer'],
      advanced: ['Paint brushes', 'Paint roller', 'Paint tray', 'Drop cloths', 'Painter\'s tape', 'Ladder', 'Paint sprayer', 'Sandpaper', 'Primer', 'Airless sprayer', 'Paint mixer', 'Spray gun']
    },
    flooring: {
      beginner: ['Measuring tape', 'Utility knife', 'Knee pads', 'Hammer', 'Level', 'Spacers'],
      intermediate: ['Measuring tape', 'Utility knife', 'Knee pads', 'Hammer', 'Level', 'Spacers', 'Saw', 'Drill', 'Underlayment', 'Transition strips'],
      advanced: ['Measuring tape', 'Utility knife', 'Knee pads', 'Hammer', 'Level', 'Spacers', 'Saw', 'Drill', 'Underlayment', 'Transition strips', 'Table saw', 'Miter saw', 'Nail gun', 'Moisture meter']
    },
    plumbing: {
      beginner: ['Plunger', 'Pipe wrench', 'Adjustable wrench', 'Teflon tape', 'Bucket'],
      intermediate: ['Plunger', 'Pipe wrench', 'Adjustable wrench', 'Teflon tape', 'Bucket', 'Pipe cutter', 'Torch', 'Solder', 'Flux'],
      advanced: ['Plunger', 'Pipe wrench', 'Adjustable wrench', 'Teflon tape', 'Bucket', 'Pipe cutter', 'Torch', 'Solder', 'Flux', 'Drain snake', 'Pipe threader', 'Water meter key', 'Pressure tester']
    },
    electrical: {
      beginner: ['Screwdrivers', 'Wire strippers', 'Voltage tester', 'Electrical tape', 'Wire nuts'],
      intermediate: ['Screwdrivers', 'Wire strippers', 'Voltage tester', 'Electrical tape', 'Wire nuts', 'Multimeter', 'Fish tape', 'Conduit bender'],
      advanced: ['Screwdrivers', 'Wire strippers', 'Voltage tester', 'Electrical tape', 'Wire nuts', 'Multimeter', 'Fish tape', 'Conduit bender', 'Circuit analyzer', 'Cable puller', 'Oscilloscope', 'Insulation tester']
    }
  };

  const generateChecklist = () => {
    if (!projectType || !skillLevel) return;
    
    const tools = toolLists[projectType as keyof typeof toolLists]?.[skillLevel as keyof typeof toolLists['painting']] || [];
    setCheckedTools([]);
    return tools;
  };

  const tools = generateChecklist();

  const toggleTool = (tool: string) => {
    setCheckedTools(prev => 
      prev.includes(tool) 
        ? prev.filter(t => t !== tool)
        : [...prev, tool]
    );
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tool Checklist Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="project-type">Project Type</Label>
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="painting">Painting</SelectItem>
                <SelectItem value="flooring">Flooring</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="skill-level">Skill Level</Label>
            <Select value={skillLevel} onValueChange={setSkillLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select skill level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {tools && tools.length > 0 && (
          <Card className="bg-gray-50">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-4">Your Tool Checklist:</h3>
              <div className="space-y-2">
                {tools.map((tool, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tool-${index}`}
                      checked={checkedTools.includes(tool)}
                      onCheckedChange={() => toggleTool(tool)}
                    />
                    <label
                      htmlFor={`tool-${index}`}
                      className={`text-sm ${checkedTools.includes(tool) ? 'line-through text-gray-500' : ''}`}
                    >
                      {tool}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Progress: {checkedTools.length}/{tools.length} tools acquired
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default ToolChecklist;
