import { useState } from 'react';
import { Send, Smile, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import FriendsList from './FriendsList';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

// Mock data for demonstration
const mockMessages = [
  {
    id: 1,
    user: 'Alex',
    avatar: '/src/assets/avatar-2.jpg',
    message: 'Hey everyone! How was your day? 😊',
    timestamp: '2:30 PM',
    isOwn: false,
  },
  {
    id: 2,
    user: 'You',
    avatar: '/src/assets/avatar-1.jpg',
    message: 'Pretty good! Just finished my project. What about you?',
    timestamp: '2:32 PM',
    isOwn: true,
  },
  {
    id: 3,
    user: 'Sam',
    avatar: '/src/assets/avatar-3.jpg',
    message: 'Amazing! I went hiking today. The weather was perfect 🌞',
    timestamp: '2:35 PM',
    isOwn: false,
  },
  {
    id: 4,
    user: 'You',
    avatar: '/src/assets/avatar-1.jpg',
    message: 'That sounds awesome! I should get out more often',
    timestamp: '2:36 PM',
    isOwn: true,
  },
];

const ChatLayout = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showTyping, setShowTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      user: 'You',
      avatar: '/src/assets/avatar-1.jpg',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate someone typing back
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      const responses = [
        'Haha, totally agree! 😄',
        'That sounds great!',
        'Nice one! 👍',
        'I love that idea!',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage = {
        id: messages.length + 2,
        user: 'Alex',
        avatar: '/src/assets/avatar-2.jpg',
        message: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false,
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-background">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden`}>
        <FriendsList />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-secondary"
            >
              <Users className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Friends Chat</h1>
              <p className="text-sm text-muted-foreground">4 friends online</p>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-chat-bg">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} {...msg} />
          ))}
          {showTyping && <TypingIndicator user="Alex" avatar="/src/assets/avatar-2.jpg" />}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-card/50 backdrop-blur-sm border-t border-border">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="pr-12 bg-input border-border focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-secondary"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="bg-gradient-primary hover:bg-primary-hover transition-all duration-200 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;