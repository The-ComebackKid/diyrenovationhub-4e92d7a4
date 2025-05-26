
import { Link } from 'react-router-dom';
import { Calculator, Ruler, Wrench, PaintBucket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from 'react';
import SEO from '@/components/SEO';
import PaintCalculator from '@/components/calculators/PaintCalculator';
import FlooringCalculator from '@/components/calculators/FlooringCalculator';
import CostEstimator from '@/components/calculators/CostEstimator';
import ToolChecklist from '@/components/calculators/ToolChecklist';

const ToolsPage = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'paint':
        return <PaintCalculator />;
      case 'flooring':
        return <FlooringCalculator />;
      case 'cost':
        return <CostEstimator />;
      case 'tools':
        return <ToolChecklist />;
      default:
        return null;
    }
  };

  return (
    <div>
      <SEO 
        title="DIY Tools & Calculators - DIY Renovation Hub"
        description="Use our free DIY tools and calculators to estimate materials, costs, and plan your renovation projects."
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bengals-title">DIY Tools & Calculators</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use our free tools to calculate materials, estimate costs, and plan your renovation projects with confidence.
          </p>
        </div>

        {!activeCalculator ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-bengals-orange/10 flex items-center justify-center mb-4">
                  <PaintBucket className="h-6 w-6 text-bengals-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Paint Calculator</h3>
                <p className="text-gray-600 mb-4">
                  Calculate exactly how much paint you need for your project, including primer and multiple coats.
                </p>
                <Button 
                  className="w-full bg-bengals-orange hover:bg-orange-500"
                  onClick={() => setActiveCalculator('paint')}
                >
                  Calculate Paint
                </Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-bengals-orange/10 flex items-center justify-center mb-4">
                  <Ruler className="h-6 w-6 text-bengals-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Flooring Calculator</h3>
                <p className="text-gray-600 mb-4">
                  Estimate flooring materials needed including waste factor and trim pieces.
                </p>
                <Button 
                  className="w-full bg-bengals-orange hover:bg-orange-500"
                  onClick={() => setActiveCalculator('flooring')}
                >
                  Calculate Flooring
                </Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-bengals-orange/10 flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-bengals-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Project Cost Estimator</h3>
                <p className="text-gray-600 mb-4">
                  Get rough cost estimates for common DIY projects based on room size and materials.
                </p>
                <Button 
                  className="w-full bg-bengals-orange hover:bg-orange-500"
                  onClick={() => setActiveCalculator('cost')}
                >
                  Estimate Costs
                </Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-bengals-orange/10 flex items-center justify-center mb-4">
                  <Wrench className="h-6 w-6 text-bengals-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Tool Checklist</h3>
                <p className="text-gray-600 mb-4">
                  Generate a custom tool list for your specific project type and skill level.
                </p>
                <Button 
                  className="w-full bg-bengals-orange hover:bg-orange-500"
                  onClick={() => setActiveCalculator('tools')}
                >
                  Generate List
                </Button>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Need help with your calculations? Our AI assistant can guide you through any project planning.
              </p>
              <Link to="/chat">
                <Button size="lg" className="bg-bengals-orange hover:bg-orange-500">
                  Ask The DIY Guy
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => setActiveCalculator(null)}
              >
                ← Back to Tools
              </Button>
            </div>
            {renderCalculator()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;
