
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
          <div className="w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
              <circle cx="12" cy="12" r="10" fill="currentColor"/>
              <circle cx="9" cy="9" r="1.5" fill="white"/>
              <circle cx="15" cy="9" r="1.5" fill="white"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M12 2C8 2 6 4 6 6v2c0 1 1 2 2 2h8c1 0 2-1 2-2V6c0-2-2-4-6-4z" fill="#FFB000"/>
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default Layout;
