
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
      text: "Hi there! I'm The DIY Guy. I can help with your DIY questions! You have 3 free questions remaining today. How can I help?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [questionsLeft, setQuestionsLeft] = useState(3);
  const { toast } = useToast();
  const [mascotMood, setMascotMood] = useState<'happy' | 'thinking' | 'excited'>('happy');

  useEffect(() => {
    // Change mascot mood based on conversation
    if (messages.length > 2) {
      const randomMood = Math.random();
      if (randomMood > 0.7) setMascotMood('thinking');
      else if (randomMood > 0.3) setMascotMood('excited');
      else setMascotMood('happy');
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      text: input,
      sender: 'user',
      timestamp: new Date()
    }]);
    
    // Clear input
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      if (questionsLeft > 0) {
        const responses = [
          "Great question! For DIY beginners, I recommend starting with simple painting projects or replacing cabinet hardware. These give quick visual impact with minimal risk.",
          "When renovating a bathroom, always turn off water supply before starting. A complete renovation typically costs between $6,000-$15,000, but you can save by doing demolition yourself.",
          "For mounting heavy items, always locate wall studs using a stud finder. Use appropriate anchors for drywall if you can't hit a stud directly."
        ];

        setMessages(prev => [...prev, {
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'bot',
          timestamp: new Date()
        }]);

        const newQuestionsLeft = questionsLeft - 1;
        setQuestionsLeft(newQuestionsLeft);
        
        if (newQuestionsLeft === 0) {
          toast({
            title: "Daily limit reached",
            description: "You've used all your free questions for today. Subscribe for unlimited access!",
            duration: 5000,
          });
        }
      }
    }, 1000);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-bengals-black rounded-lg shadow-xl overflow-hidden z-50 animate-fade-in">
      <div className="chat-header bg-bengals-orange text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="h-10 w-10 bg-white rounded-full overflow-hidden border-2 border-white">
              {mascotMood === 'happy' && (
                <div className="flex flex-col items-center justify-center h-full bg-bengals-orange text-white">
                  <span className="text-xs font-bold">DIY</span>
                  <span className="text-[8px]">Guy</span>
                </div>
              )}
              {mascotMood === 'thinking' && (
                <div className="flex flex-col items-center justify-center h-full bg-bengals-orange text-white">
                  <span className="text-xs font-bold">DIY</span>
                  <span className="text-[8px]">🤔</span>
                </div>
              )}
              {mascotMood === 'excited' && (
                <div className="flex flex-col items-center justify-center h-full bg-bengals-orange text-white">
                  <span className="text-xs font-bold">DIY</span>
                  <span className="text-[8px]">🔨</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <span className="font-bold text-sm">The DIY Guy</span>
            <p className="text-xs opacity-90">{questionsLeft} questions remaining</p>
          </div>
        </div>
        <button 
          onClick={() => setShow(false)}
          className="text-white hover:bg-black/10 p-1 rounded-full"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="bg-white h-80 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg max-w-[80%] ${
              message.sender === 'user' 
                ? 'bg-bengals-orange/10 ml-auto' 
                : 'bg-gray-100 mr-auto'
            }`}
          >
            <p className="text-sm">{message.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50 border-t">
        {questionsLeft === 0 && (
          <div className="mb-3 text-center">
            <p className="text-xs text-gray-500 mb-1">You've used all your free questions</p>
            <a href="/pricing" className="text-sm text-bengals-orange hover:underline">Subscribe for unlimited access</a>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Ask me about your DIY project..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={questionsLeft === 0}
            className="flex-grow"
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || questionsLeft === 0}
            className="bg-bengals-orange hover:bg-orange-500"
            aria-label="Send message"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
