
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface WelcomeBubbleProps {
  onClose: () => void;
  onOpenChat: () => void;
}

const WelcomeBubble = ({ onClose, onOpenChat }: WelcomeBubbleProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the bubble after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const handleChatClick = () => {
    onOpenChat();
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50 animate-fade-in">
      <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
        {/* Speech bubble arrow */}
        <div className="absolute bottom-0 right-8 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
        
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close welcome message"
        >
          <X size={16} />
        </button>
        
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 bg-bengals-orange rounded-full flex items-center justify-center">
              <div className="text-white text-xs font-bold">
                <div className="text-center">
                  <div>DIY</div>
                  <div className="text-[8px]">Guy</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <p className="text-sm text-gray-800 mb-3">
              Welcome to the DIY Renovation Hub! I'm here to help with any questions you may have.
            </p>
            <button
              onClick={handleChatClick}
              className="bg-bengals-orange text-white text-xs px-3 py-1 rounded-full hover:bg-orange-500 transition-colors"
            >
              Just hit that chat button down below! 👇
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBubble;
