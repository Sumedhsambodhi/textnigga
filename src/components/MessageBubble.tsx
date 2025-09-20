import { Heart, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

interface MessageBubbleProps {
  id: number;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
}

const MessageBubble = ({ user, avatar, message, timestamp, isOwn }: MessageBubbleProps) => {
  const [reactions, setReactions] = useState<{ [key: string]: number }>({});
  const [showReactions, setShowReactions] = useState(false);

  const addReaction = (type: string) => {
    setReactions(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + 1
    }));
  };

  return (
    <div 
      className={`flex gap-3 animate-message-bounce ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      {!isOwn && (
        <img
          src={avatar}
          alt={user}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-border flex-shrink-0"
        />
      )}
      
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
        {!isOwn && (
          <span className="text-sm font-medium text-foreground mb-1">{user}</span>
        )}
        
        <div className="relative group">
          <div
            className={`px-4 py-3 rounded-2xl transition-all duration-200 hover:scale-105 ${
              isOwn
                ? 'bg-message-own text-message-own-foreground rounded-br-md'
                : 'bg-message-other text-message-other-foreground rounded-bl-md'
            }`}
          >
            <p className="text-sm leading-relaxed">{message}</p>
          </div>
          
          {/* Reaction buttons */}
          {showReactions && (
            <div className={`absolute top-0 ${isOwn ? 'left-0' : 'right-0'} -translate-y-12 flex gap-1 bg-card border border-border rounded-full p-1 animate-bounce-in`}>
              <button
                onClick={() => addReaction('heart')}
                className="p-1 hover:bg-secondary rounded-full transition-colors"
              >
                <Heart className="w-4 h-4 text-red-500" />
              </button>
              <button
                onClick={() => addReaction('thumbs')}
                className="p-1 hover:bg-secondary rounded-full transition-colors"
              >
                <ThumbsUp className="w-4 h-4 text-blue-500" />
              </button>
            </div>
          )}
          
          {/* Reaction counts */}
          {Object.keys(reactions).length > 0 && (
            <div className={`flex gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
              {Object.entries(reactions).map(([type, count]) => (
                <span
                  key={type}
                  className="text-xs bg-card border border-border rounded-full px-2 py-1 flex items-center gap-1"
                >
                  {type === 'heart' ? '❤️' : '👍'} {count}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
      </div>
      
      {isOwn && (
        <img
          src={avatar}
          alt="You"
          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/50 flex-shrink-0"
        />
      )}
    </div>
  );
};

export default MessageBubble;