
import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ChatWidgetProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ChatWidget = ({ show, setShow }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<Array<{text: string; sender: 'user' | 'bot'; timestamp: Date}>>([
    {
      text: "Hey there! 👋 I'm The DIY Guy, your personal renovation assistant! I've helped thousands of homeowners tackle projects big and small. You have 3 free questions remaining today - let's make them count! What's your project?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [questionsLeft, setQuestionsLeft] = useState(3);
  const { toast } = useToast();
  const [mascotMood, setMascotMood] = useState<'happy' | 'thinking' | 'excited' | 'helpful'>('happy');

  useEffect(() => {
    // Change mascot mood based on conversation and content
    if (messages.length > 2) {
      const lastUserMessage = messages.slice().reverse().find(m => m.sender === 'user')?.text.toLowerCase() || '';
      
      if (lastUserMessage.includes('bathroom') || lastUserMessage.includes('kitchen')) {
        setMascotMood('excited');
      } else if (lastUserMessage.includes('help') || lastUserMessage.includes('problem')) {
        setMascotMood('helpful');
      } else if (lastUserMessage.includes('?')) {
        setMascotMood('thinking');
      } else {
        setMascotMood('happy');
      }
    }
  }, [messages]);

  const getDIYResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    // Bathroom renovation responses
    if (input.includes('bathroom')) {
      return "🚿 Bathroom renovations are exciting! Here's my pro tip: Always start with plumbing and electrical work first. Budget around $8,000-$15,000 for a full reno. Key steps: 1) Turn off water supply 2) Demo carefully (save the vanity if it's good!) 3) Install new plumbing/electrical 4) Waterproof everything 5) Tile work 6) Install fixtures. Want specifics on any step?";
    }
    
    // Kitchen renovation responses
    if (input.includes('kitchen')) {
      return "🍳 Kitchen renos are my favorite! The key is planning your workflow triangle (sink, stove, fridge). Budget $15,000-$40,000 depending on scope. Pro sequence: 1) Demo 2) Electrical/plumbing rough-in 3) Drywall 4) Flooring 5) Cabinets 6) Countertops 7) Backsplash 8) Appliances. Cabinet refacing can save you 50%! What's your kitchen vision?";
    }
    
    // Painting responses
    if (input.includes('paint') || input.includes('color')) {
      return "🎨 Painting is the best bang for your buck! Here's the DIY Guy formula: 1 gallon covers ~400 sq ft. Always use primer on new surfaces. My go-to sequence: prep walls → prime → paint ceiling → paint walls (cut in first, then roll). Use quality brushes and rollers - trust me, you'll see the difference! What room are you painting?";
    }
    
    // Flooring responses
    if (input.includes('floor') || input.includes('laminate') || input.includes('hardwood')) {
      return "🏠 Flooring transforms everything! LVP (luxury vinyl plank) is super DIY-friendly and durable. Laminate saves money but avoid it in bathrooms. Real hardwood adds value but costs more. Always acclimate materials 48hrs before install. Start in the longest, straightest wall. Need help choosing materials?";
    }
    
    // Tool responses
    if (input.includes('tool') || input.includes('drill') || input.includes('saw')) {
      return "🔧 Great question! My essential DIY toolkit: cordless drill, circular saw, level, stud finder, measuring tape, and safety glasses. For most projects, mid-range brands like Ryobi offer great value. Pro tip: buy quality measuring tools and safety gear, save money on power tools you'll use occasionally. What project are you tooling up for?";
    }
    
    // Budget responses
    if (input.includes('cost') || input.includes('budget') || input.includes('expensive')) {
      return "💰 Smart to think budget first! Rule of thumb: always add 20% contingency for surprises. DIY can save 50-70% on labor costs. Focus spending on: structural work (hire pros), quality tools you'll reuse, and materials you'll see daily. Splurge on: hardware, lighting, and paint (good paint lasts!). What's your project budget range?";
    }
    
    // General helpful responses
    const generalResponses = [
      "🔨 That's a fantastic project! The key to any successful DIY job is preparation - measure twice, cut once! What specific challenge are you facing?",
      "🏆 I love your DIY spirit! Remember, every expert was once a beginner. Start with good planning, invest in quality materials for visible areas, and don't rush the job. What's your timeline looking like?",
      "⚡ Great question! Safety first - always wear protective gear and know when to call a pro (electrical, gas, structural). Most DIY projects are totally doable with patience and the right approach. What's got you concerned?",
      "🎯 Perfect timing to ask! The secret to DIY success is breaking big projects into smaller, manageable tasks. This prevents overwhelm and helps you maintain quality. What's your next step going to be?",
      "🌟 You're on the right track! I always tell DIYers: research thoroughly, gather all materials first, and have a cleanup plan. These three things separate successful projects from disasters. How can I help you prepare?"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      text: input,
      sender: 'user',
      timestamp: new Date()
    }]);
    
    const currentInput = input;
    setInput('');

    // Get contextual DIY response
    setTimeout(() => {
      if (questionsLeft > 0) {
        const botResponse = getDIYResponse(currentInput);

        setMessages(prev => [...prev, {
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        }]);

        const newQuestionsLeft = questionsLeft - 1;
        setQuestionsLeft(newQuestionsLeft);
        
        if (newQuestionsLeft === 0) {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              text: "🎉 That's all for your free questions today! But hey, you're clearly serious about DIY - our premium subscribers get unlimited questions, photo analysis, and even emergency support for those 'oops' moments. Ready to level up your DIY game?",
              sender: 'bot',
              timestamp: new Date()
            }]);
          }, 1500);
          
          toast({
            title: "Daily limit reached! 🎯",
            description: "You've used all your free questions for today. Subscribe for unlimited access and photo analysis!",
            duration: 7000,
          });
        }
      }
    }, 1000);
  };

  if (!show) return null;

  const getDIYGuyAvatar = () => {
    return (
      <div className="h-12 w-12 bg-white rounded-full overflow-hidden border-2 border-white flex items-center justify-center relative shadow-sm">
        <svg 
          viewBox="0 0 48 48" 
          className="w-10 h-10"
          style={{ display: 'block' }}
        >
          {/* Hard hat */}
          <path 
            d="M12 18c0-8 6-12 12-12s12 4 12 12v4c0 2-2 4-4 4H16c-2 0-4-2-4-4v-4z" 
            fill="#FFB000" 
            stroke="#E69500" 
            strokeWidth="1"
          />
          {/* Face */}
          <circle cx="24" cy="30" r="12" fill="#FDBCB4" />
          {/* Eyes */}
          <circle cx="20" cy="27" r="2" fill="#2D3748" />
          <circle cx="28" cy="27" r="2" fill="#2D3748" />
          {/* Eye shine */}
          <circle cx="20.5" cy="26.5" r="0.5" fill="white" />
          <circle cx="28.5" cy="26.5" r="0.5" fill="white" />
          {/* Smile */}
          <path 
            d="M18 32s2 3 6 3 6-3 6-3" 
            stroke="#2D3748" 
            strokeWidth="2" 
            strokeLinecap="round" 
            fill="none"
          />
          {/* Tool belt accent */}
          <rect x="16" y="40" width="16" height="3" fill="#8B4513" rx="1" />
        </svg>
        <div className="absolute -bottom-1 -right-1 bg-green-400 w-4 h-4 rounded-full border-2 border-white"></div>
      </div>
    );
  };

  const getMascotDisplay = () => {
    const baseAvatar = getDIYGuyAvatar();
    
    switch (mascotMood) {
      case 'thinking':
        return { 
          component: (
            <div className="relative">
              {baseAvatar}
              <div className="absolute -top-2 -right-2 text-sm">🤔</div>
            </div>
          ), 
          bgColor: 'bg-blue-500' 
        };
      case 'excited':
        return { 
          component: (
            <div className="relative">
              {baseAvatar}
              <div className="absolute -top-2 -right-2 text-sm animate-bounce">🔥</div>
            </div>
          ), 
          bgColor: 'bg-red-500' 
        };
      case 'helpful':
        return { 
          component: (
            <div className="relative">
              {baseAvatar}
              <div className="absolute -top-2 -right-2 text-sm">🛠️</div>
            </div>
          ), 
          bgColor: 'bg-green-500' 
        };
      default:
        return { 
          component: baseAvatar, 
          bgColor: 'bg-bengals-orange' 
        };
    }
  };

  const mascotDisplay = getMascotDisplay();

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 animate-fade-in border border-gray-200">
      <div className={`chat-header ${mascotDisplay.bgColor} text-white p-4 flex justify-between items-center`}>
        <div className="flex items-center space-x-3">
          <div className="relative">
            {mascotDisplay.component}
          </div>
          <div>
            <span className="font-bold text-sm">The DIY Guy</span>
            <p className="text-xs opacity-90">
              {questionsLeft > 0 ? `${questionsLeft} questions remaining` : 'Upgrade for unlimited!'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShow(false)}
          className="text-white hover:bg-black/10 p-1 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="bg-gray-50 h-80 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`p-3 rounded-lg max-w-[85%] ${
              message.sender === 'user' 
                ? 'bg-bengals-orange text-white ml-auto' 
                : 'bg-white shadow-sm border'
            }`}>
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-white border-t">
        {questionsLeft === 0 && (
          <div className="mb-3 text-center bg-bengals-orange/10 rounded-lg p-2">
            <p className="text-xs text-bengals-orange mb-1 font-medium">🎯 Daily limit reached!</p>
            <a href="/pricing" className="text-sm text-bengals-orange hover:underline font-medium">
              Upgrade for unlimited questions + photo analysis →
            </a>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Ask about your DIY project..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={questionsLeft === 0}
            className="flex-grow"
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || questionsLeft === 0}
            className="bg-bengals-orange hover:bg-orange-500 shrink-0"
            aria-label="Send message"
          >
            <Send size={18} />
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          <p>💡 Premium: Upload photos, get expert consultations & 24/7 support</p>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
