
import { useState } from 'react';
import { X, Send, SmilePlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

    // Simulate bot response (in a real app, this would be a call to an API)
    setTimeout(() => {
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

      if (questionsLeft > 0) {
        setQuestionsLeft(prev => prev - 1);
      }
    }, 1000);
  };

  if (!show) return null;

  return (
    <div className="chat-container animate-fade-in">
      <div className="chat-header">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-bengals-orange font-bold text-sm">DIY</span>
          </div>
          <div>
            <span className="font-bold">DIY Assistant</span>
            <p className="text-xs opacity-90">{questionsLeft} questions remaining</p>
          </div>
        </div>
        <button 
          onClick={() => setShow(false)}
          className="text-white hover:bg-black/10 p-1 rounded-full"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`chat-message ${message.sender === 'user' ? 'chat-message-user' : 'chat-message-bot'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      
      <div className="chat-input-container">
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
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
