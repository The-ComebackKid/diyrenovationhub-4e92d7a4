
import { ReactNode, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import WelcomeBubble from './WelcomeBubble';
import Analytics from './Analytics';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showChat, setShowChat] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user has seen welcome before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const handleOpenChatFromWelcome = () => {
    setShowChat(true);
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const getDIYGuyFloatingButton = () => {
    return (
      <div className="w-6 h-6 flex items-center justify-center">
        <svg 
          viewBox="0 0 48 48" 
          className="w-6 h-6"
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
          <circle cx="20" cy="27" r="2" fill="white" />
          <circle cx="28" cy="27" r="2" fill="white" />
          {/* Pupils */}
          <circle cx="20" cy="27" r="1" fill="#2D3748" />
          <circle cx="28" cy="27" r="1" fill="#2D3748" />
          {/* Smile */}
          <path 
            d="M18 32s2 3 6 3 6-3 6-3" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            fill="none"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Analytics />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ChatWidget show={showChat} setShow={setShowChat} />
      
      {/* Welcome bubble appears when chat is closed and user hasn't seen it */}
      {!showChat && showWelcome && (
        <WelcomeBubble 
          onClose={handleCloseWelcome}
          onOpenChat={handleOpenChatFromWelcome}
        />
      )}
      
      {!showChat && (
        <button 
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 z-40 bg-bengals-orange text-white p-3 rounded-full shadow-lg hover:bg-orange-500 transition-colors animate-pulse"
          aria-label="Open chat assistant"
        >
          {getDIYGuyFloatingButton()}
        </button>
      )}
    </div>
  );
};

export default Layout;
