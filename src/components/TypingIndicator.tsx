interface TypingIndicatorProps {
  user: string;
  avatar: string;
}

const TypingIndicator = ({ user, avatar }: TypingIndicatorProps) => {
  return (
    <div className="flex gap-3 animate-slide-up">
      <img
        src={avatar}
        alt={user}
        className="w-10 h-10 rounded-full object-cover ring-2 ring-border flex-shrink-0"
      />
      
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground mb-1">{user}</span>
        
        <div className="bg-message-other text-message-other-foreground px-4 py-3 rounded-2xl rounded-bl-md">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-pulse"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
        
        <span className="text-xs text-muted-foreground mt-1">typing...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;