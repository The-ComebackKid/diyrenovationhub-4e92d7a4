
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const PaintCalculator = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [doors, setDoors] = useState('2');
  const [windows, setWindows] = useState('4');
  const [coats, setCoats] = useState('2');
  const [result, setResult] = useState<{
    wallArea: number;
    gallonsNeeded: number;
    cost: number;
  } | null>(null);

  const calculatePaint = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const d = parseInt(doors);
    const win = parseInt(windows);
    const c = parseInt(coats);

    if (!l || !w || !h) return;

    // Calculate wall area
    const wallArea = 2 * (l * h) + 2 * (w * h);
    
    // Subtract door and window area (standard sizes)
    const doorArea = d * 20; // 20 sq ft per door
    const windowArea = win * 12; // 12 sq ft per window
    
    const paintableArea = wallArea - doorArea - windowArea;
    
    // 1 gallon covers ~350 sq ft
    const gallonsNeeded = Math.ceil((paintableArea * c) / 350);
    
    // Estimate cost at $35/gallon
    const cost = gallonsNeeded * 35;

    setResult({
      wallArea: paintableArea,
      gallonsNeeded,
      cost
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Paint Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="length">Length (ft)</Label>
            <Input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="12"
            />
          </div>
          <div>
            <Label htmlFor="width">Width (ft)</Label>
            <Input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="10"
            />
          </div>
          <div>
            <Label htmlFor="height">Height (ft)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="8"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="doors">Number of Doors</Label>
            <Input
              id="doors"
              type="number"
              value={doors}
              onChange={(e) => setDoors(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="windows">Number of Windows</Label>
            <Input
              id="windows"
              type="number"
              value={windows}
              onChange={(e) => setWindows(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="coats">Number of Coats</Label>
            <Input
              id="coats"
              type="number"
              value={coats}
              onChange={(e) => setCoats(e.target.value)}
            />
          </div>
        </div>

        <Button 
          onClick={calculatePaint} 
          className="w-full bg-bengals-orange hover:bg-orange-500"
        >
          Calculate Paint Needed
        </Button>

        {result && (
          <Card className="bg-gray-50">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-2">Results:</h3>
              <p>Paintable Area: {result.wallArea.toFixed(1)} sq ft</p>
              <p>Paint Needed: {result.gallonsNeeded} gallons</p>
              <p>Estimated Cost: ${result.cost}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default PaintCalculator;
