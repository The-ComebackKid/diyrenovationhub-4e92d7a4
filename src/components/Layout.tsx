
import { ReactNode, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import WelcomeBubble from './WelcomeBubble';

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
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
              <circle cx="12" cy="12" r="8" fill="currentColor"/>
              <circle cx="10" cy="10" r="1" fill="white"/>
              <circle cx="14" cy="10" r="1" fill="white"/>
              <path d="M9 13s1 1.5 3 1.5 3-1.5 3-1.5" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default Layout;
