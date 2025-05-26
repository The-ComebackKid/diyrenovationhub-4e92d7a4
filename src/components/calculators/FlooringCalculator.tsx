
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const FlooringCalculator = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [wastePercent, setWastePercent] = useState('10');
  const [pricePerSqFt, setPricePerSqFt] = useState('3.50');
  const [result, setResult] = useState<{
    baseArea: number;
    totalArea: number;
    materials: number;
    cost: number;
  } | null>(null);

  const calculateFlooring = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const waste = parseFloat(wastePercent);
    const price = parseFloat(pricePerSqFt);

    if (!l || !w) return;

    const baseArea = l * w;
    const totalArea = baseArea * (1 + waste / 100);
    const materials = Math.ceil(totalArea);
    const cost = materials * price;

    setResult({
      baseArea,
      totalArea,
      materials,
      cost
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Flooring Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="waste">Waste Factor (%)</Label>
            <Input
              id="waste"
              type="number"
              value={wastePercent}
              onChange={(e) => setWastePercent(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="price">Price per sq ft ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={pricePerSqFt}
              onChange={(e) => setPricePerSqFt(e.target.value)}
            />
          </div>
        </div>

        <Button 
          onClick={calculateFlooring} 
          className="w-full bg-bengals-orange hover:bg-orange-500"
        >
          Calculate Flooring Needed
        </Button>

        {result && (
          <Card className="bg-gray-50">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-2">Results:</h3>
              <p>Base Area: {result.baseArea.toFixed(1)} sq ft</p>
              <p>With Waste: {result.totalArea.toFixed(1)} sq ft</p>
              <p>Materials Needed: {result.materials} sq ft</p>
              <p>Estimated Cost: ${result.cost.toFixed(2)}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default FlooringCalculator;
