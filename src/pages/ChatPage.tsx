
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Image, Send, Smile, Paperclip } from 'lucide-react';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{text: string; sender: 'user' | 'bot'; timestamp: Date}>>([
    {
      text: "Hi there! I'm the DIY Assistant. I can help with your home renovation questions. What are you working on today?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      text: message,
      sender: 'user',
      timestamp: new Date()
    }]);

    // Clear input
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "That's a great project! Here are some tips to help you get started...",
        "For that type of renovation, you'll want to consider these factors...",
        "I'd recommend these tools for your project: a power drill, level, measuring tape, and a stud finder.",
        "Before starting, make sure you check if you need any permits for that work.",
        "The average cost for that project is between $1,500-3,000 depending on materials.",
        "Here's a step-by-step approach I'd recommend for your project..."
      ];

      setMessages(prev => [...prev, {
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bengals-title">DIY Chat Assistant</h1>
            <p className="text-gray-600">
              Get personalized help with your renovation projects
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Tabs defaultValue="chat" className="w-full">
              <div className="border-b">
                <TabsList className="w-full flex justify-start px-4">
                  <TabsTrigger value="chat" className="data-[state=active]:text-bengals-orange">Chat</TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:text-bengals-orange">History</TabsTrigger>
                  <TabsTrigger value="saved" className="data-[state=active]:text-bengals-orange">Saved</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="chat" className="p-0">
                <div className="h-[500px] flex flex-col">
                  {/* Chat messages */}
                  <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                      <div 
                        key={index}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.sender === 'user' 
                              ? 'bg-bengals-orange text-white' 
                              : 'bg-gray-100'
                          }`}
                        >
                          {msg.text}
                          <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chat input */}
                  <div className="border-t p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" className="shrink-0">
                        <Image size={18} />
                      </Button>
                      <Button variant="outline" size="icon" className="shrink-0">
                        <Camera size={18} />
                      </Button>
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask me about your DIY project..."
                        className="flex-grow"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} className="shrink-0 bg-bengals-orange hover:bg-orange-500">
                        <Send size={18} />
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Premium subscribers: Upload photos of your project for personalized advice</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Your Chat History</h3>
                  <p className="text-gray-500 mb-4">View and continue your previous conversations</p>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 text-left hover:border-bengals-orange cursor-pointer">
                      <h4 className="font-medium">Kitchen Backsplash Project</h4>
                      <p className="text-sm text-gray-500">Last message: 2 days ago</p>
                    </div>
                    <div className="border rounded-lg p-4 text-left hover:border-bengals-orange cursor-pointer">
                      <h4 className="font-medium">Bathroom Renovation Questions</h4>
                      <p className="text-sm text-gray-500">Last message: 1 week ago</p>
                    </div>
                    <div className="border rounded-lg p-4 text-left hover:border-bengals-orange cursor-pointer">
                      <h4 className="font-medium">Deck Building Project</h4>
                      <p className="text-sm text-gray-500">Last message: 2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="saved">
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Saved Responses</h3>
                  <p className="text-gray-500 mb-4">Helpful answers you've saved for reference</p>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 text-left">
                      <h4 className="font-medium">How to find wall studs</h4>
                      <p className="text-sm text-gray-600 mt-2">Electronic stud finders are the most reliable method, but if you don't have one, try these techniques: Look for outlets (usually attached to studs), measure 16" or 24" from corners (standard stud spacing), and tap the wall and listen for a less hollow sound. You can also use a strong magnet to find drywall screws...</p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">View Full Answer</Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 text-left">
                      <h4 className="font-medium">Paint calculator formula</h4>
                      <p className="text-sm text-gray-600 mt-2">To calculate how much paint you need, multiply the wall height by width for each wall to get the square footage. Subtract window and door areas. One gallon typically covers 350-400 sq ft, depending on the paint and surface...</p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">View Full Answer</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Premium Features */}
          <div className="mt-8">
            <div className="bg-bengals-orange/10 rounded-lg p-6 border border-bengals-orange/30">
              <h2 className="text-xl font-semibold text-bengals-orange mb-3">Upgrade to Premium</h2>
              <p className="mb-4">Get advanced features with our premium subscriptions:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Upload photos for visual project analysis</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Get personalized project plans and shopping lists</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>One-on-one expert consultations for complex projects</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Priority 24/7 emergency support</span>
                </li>
              </ul>
              <div className="flex justify-center">
                <Button className="bg-bengals-orange hover:bg-orange-500">View Premium Plans</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
