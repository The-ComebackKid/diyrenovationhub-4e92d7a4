
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell,
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  MessageCircle, 
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Globe,
  Clock,
  Calendar
} from 'lucide-react';

// Sample data for charts
const visitorData = [
  { name: 'Jan', visitors: 4000, newUsers: 2400, pageViews: 9800 },
  { name: 'Feb', visitors: 3000, newUsers: 1398, pageViews: 7800 },
  { name: 'Mar', visitors: 2000, newUsers: 9800, pageViews: 12000 },
  { name: 'Apr', visitors: 2780, newUsers: 3908, pageViews: 14800 },
  { name: 'May', visitors: 1890, newUsers: 4800, pageViews: 10800 },
  { name: 'Jun', visitors: 2390, newUsers: 3800, pageViews: 9800 },
  { name: 'Jul', visitors: 3490, newUsers: 4300, pageViews: 11200 },
];

const pageViewData = [
  { name: 'Home', views: 4000 },
  { name: 'Blog', views: 3000 },
  { name: 'Chat', views: 2000 },
  { name: 'Pricing', views: 2780 },
  { name: 'Community', views: 1890 },
  { name: 'Store', views: 2390 },
  { name: 'Contractors', views: 3490 },
];

const deviceData = [
  { name: 'Desktop', value: 60 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 5 },
];

const subscriptionData = [
  { name: 'Basic', value: 120 },
  { name: 'Standard', value: 80 },
  { name: 'Premium', value: 40 },
];

const COLORS = ['#D4A76A', '#4A90E2', '#58B368', '#FFB839', '#E35656'];

const marketingIdeas = [
  {
    title: "Email Newsletter Campaign",
    description: "Launch a weekly newsletter with DIY tips, special offers, and exclusive content for subscribers.",
    effort: "Medium",
    potential: "High",
    time: "1-2 weeks"
  },
  {
    title: "Social Media Contests",
    description: "Run 'Before & After' renovation photo contests on Instagram with tool kit prizes.",
    effort: "Low",
    potential: "Medium",
    time: "Ongoing"
  },
  {
    title: "Partner with Influencers",
    description: "Collaborate with DIY influencers for sponsored content and tutorials.",
    effort: "Medium",
    potential: "High",
    time: "1-3 months"
  },
  {
    title: "Local Workshop Events",
    description: "Host in-person DIY workshops in partnership with home improvement stores.",
    effort: "High",
    potential: "Medium",
    time: "2-3 months"
  },
  {
    title: "SEO Content Strategy",
    description: "Create in-depth guides on high-search-volume renovation topics.",
    effort: "Medium",
    potential: "High",
    time: "Ongoing"
  },
  {
    title: "Referral Program",
    description: "Implement a 'Refer-a-Friend' program with subscription discounts for both parties.",
    effort: "Low",
    potential: "Medium",
    time: "2 weeks"
  }
];

const AdminPage = () => {
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Monitor website performance and analytics</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button 
            variant={dateRange === '7d' ? 'default' : 'outline'} 
            onClick={() => setDateRange('7d')}
            size="sm"
          >
            Last 7 days
          </Button>
          <Button 
            variant={dateRange === '30d' ? 'default' : 'outline'} 
            onClick={() => setDateRange('30d')}
            size="sm"
          >
            Last 30 days
          </Button>
          <Button 
            variant={dateRange === '90d' ? 'default' : 'outline'} 
            onClick={() => setDateRange('90d')}
            size="sm"
          >
            Last 90 days
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Custom
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="marketing">Marketing Ideas</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {/* Stats cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,781</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />+12.5%
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">240</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />+8.2%
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,324</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />+19.4%
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,231.89</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />+15.8%
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>
                  Daily website visitors and page views
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={visitorData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="visitors" stroke="#D4A76A" fill="#D4A76A" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="pageViews" stroke="#4A90E2" fill="#4A90E2" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription Distribution</CardTitle>
                <CardDescription>
                  Breakdown by plan type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subscriptionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {subscriptionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Traffic Tab */}
        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86,412</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />+18.2%
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3m 42s</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />+0.8%
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.3%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 flex items-center">
                    <ArrowDownRight className="h-4 w-4 mr-1" />+1.4%
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Organic</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Social</span>
                    <span className="font-medium">24%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Referral</span>
                    <span className="font-medium">11%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages on your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pageViewData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="views" fill="#D4A76A" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>Visitor device breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Basic Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />+5.2%
                  </span>
                </p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>Monthly Revenue</span>
                    <span>$1,198.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Churn Rate</span>
                    <span>8.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Standard Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">80</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />+12.8%
                  </span>
                </p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>Monthly Revenue</span>
                    <span>$1,599.20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Churn Rate</span>
                    <span>6.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Premium Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">40</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />+18.5%
                  </span>
                </p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>Monthly Revenue</span>
                    <span>$1,599.60</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Churn Rate</span>
                    <span>4.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Subscription Growth</CardTitle>
              <CardDescription>Monthly subscription count by plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Jan', basic: 50, standard: 30, premium: 15 },
                      { month: 'Feb', basic: 65, standard: 35, premium: 20 },
                      { month: 'Mar', basic: 70, standard: 40, premium: 22 },
                      { month: 'Apr', basic: 85, standard: 45, premium: 25 },
                      { month: 'May', basic: 95, standard: 55, premium: 30 },
                      { month: 'Jun', basic: 100, standard: 65, premium: 35 },
                      { month: 'Jul', basic: 120, standard: 80, premium: 40 },
                    ]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="basic" stroke="#D4A76A" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="standard" stroke="#4A90E2" />
                    <Line type="monotone" dataKey="premium" stroke="#58B368" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Average Customer Lifetime Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-5xl font-bold mb-2">$248</div>
                  <p className="text-muted-foreground">Average revenue per user</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conversion Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Free to Paid Conversion</span>
                      <span className="font-medium">14.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-bengals-orange h-2 rounded-full" style={{ width: '14.2%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Trial to Paid Conversion</span>
                      <span className="font-medium">68.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-bengals-orange h-2 rounded-full" style={{ width: '68.5%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Plan Upgrade Rate</span>
                      <span className="font-medium">8.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-bengals-orange h-2 rounded-full" style={{ width: '8.7%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Marketing Ideas Tab */}
        <TabsContent value="marketing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Campaign Ideas</CardTitle>
              <CardDescription>Strategies to grow your audience and increase conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {marketingIdeas.map((idea, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{idea.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{idea.description}</p>
                    <div className="flex justify-between text-xs">
                      <div>
                        <span className="font-medium">Effort: </span>
                        <span className={`${idea.effort === 'Low' ? 'text-green-500' : idea.effort === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                          {idea.effort}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Potential: </span>
                        <span className={`${idea.potential === 'High' ? 'text-green-500' : idea.potential === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                          {idea.potential}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Time: </span>
                        <span>{idea.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>SEO Performance</CardTitle>
                <CardDescription>Top search terms driving traffic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>DIY bathroom renovation</span>
                    <span className="font-medium">2,145 visits</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>How to install vinyl flooring</span>
                    <span className="font-medium">1,832 visits</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Kitchen remodel cost calculator</span>
                    <span className="font-medium">1,456 visits</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Best paint for bedroom walls</span>
                    <span className="font-medium">1,233 visits</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>DIY deck building guide</span>
                    <span className="font-medium">987 visits</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Full SEO Report
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Content Engagement</CardTitle>
                <CardDescription>Most popular blog posts and tutorials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>10 Weekend Projects Under $100</span>
                    <span className="font-medium">15.2% CTR</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Beginner's Guide to Power Tools</span>
                    <span className="font-medium">12.8% CTR</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Transform Your Kitchen on a Budget</span>
                    <span className="font-medium">11.5% CTR</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Essential DIY Safety Tips</span>
                    <span className="font-medium">10.9% CTR</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Home Office Renovation Ideas</span>
                    <span className="font-medium">9.7% CTR</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Content Strategy Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
