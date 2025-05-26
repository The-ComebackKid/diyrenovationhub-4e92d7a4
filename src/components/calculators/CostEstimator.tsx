
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CostEstimator = () => {
  const [projectType, setProjectType] = useState('');
  const [roomLength, setRoomLength] = useState('');
  const [roomWidth, setRoomWidth] = useState('');
  const [qualityLevel, setQualityLevel] = useState('');
  const [result, setResult] = useState<{
    lowEstimate: number;
    midEstimate: number;
    highEstimate: number;
  } | null>(null);

  const projectCosts = {
    bathroom: { low: 15, mid: 35, high: 65 }, // per sq ft
    kitchen: { low: 25, mid: 50, high: 100 },
    bedroom: { low: 8, mid: 15, high: 30 },
    living_room: { low: 10, mid: 20, high: 40 }
  };

  const calculateCost = () => {
    const length = parseFloat(roomLength);
    const width = parseFloat(roomWidth);
    
    if (!length || !width || !projectType) return;

    const area = length * width;
    const costs = projectCosts[projectType as keyof typeof projectCosts];
    
    if (!costs) return;

    const lowEstimate = area * costs.low;
    const midEstimate = area * costs.mid;
    const highEstimate = area * costs.high;

    setResult({
      lowEstimate,
      midEstimate,
      highEstimate
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Project Cost Estimator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="project-type">Project Type</Label>
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bathroom">Bathroom Renovation</SelectItem>
              <SelectItem value="kitchen">Kitchen Renovation</SelectItem>
              <SelectItem value="bedroom">Bedroom Renovation</SelectItem>
              <SelectItem value="living_room">Living Room Renovation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="length">Room Length (ft)</Label>
            <Input
              id="length"
              type="number"
              value={roomLength}
              onChange={(e) => setRoomLength(e.target.value)}
              placeholder="12"
            />
          </div>
          <div>
            <Label htmlFor="width">Room Width (ft)</Label>
            <Input
              id="width"
              type="number"
              value={roomWidth}
              onChange={(e) => setRoomWidth(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>

        <Button 
          onClick={calculateCost} 
          className="w-full bg-bengals-orange hover:bg-orange-500"
        >
          Estimate Project Cost
        </Button>

        {result && (
          <Card className="bg-gray-50">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-2">Cost Estimates:</h3>
              <div className="space-y-2">
                <p>Budget Option: ${result.lowEstimate.toLocaleString()}</p>
                <p>Mid-Range: ${result.midEstimate.toLocaleString()}</p>
                <p>High-End: ${result.highEstimate.toLocaleString()}</p>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                *Estimates are rough and may vary based on location and specific requirements
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default CostEstimator;
