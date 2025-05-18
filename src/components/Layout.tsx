
import { ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ChatWidget show={showChat} setShow={setShowChat} />
      {!showChat && (
        <button 
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 z-40 bg-bengals-orange text-white p-3 rounded-full shadow-lg hover:bg-orange-500 transition-colors"
          aria-label="Open chat assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M13 8h.01"></path><path d="M17 8h.01"></path><path d="M9 8h.01"></path></svg>
        </button>
      )}
    </div>
  );
};

export default Layout;
