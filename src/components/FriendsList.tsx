import { Circle } from 'lucide-react';
import avatar1 from '../assets/avatar-1.jpg';
import avatar2 from '../assets/avatar-2.jpg';
import avatar3 from '../assets/avatar-3.jpg';
import avatar4 from '../assets/avatar-4.jpg';

const friends = [
  {
    id: 1,
    name: 'You',
    avatar: avatar1,
    status: 'online',
    lastMessage: 'That sounds awesome!',
  },
  {
    id: 2,
    name: 'Alex',
    avatar: avatar2,
    status: 'online',
    lastMessage: 'Amazing! I went hiking today...',
  },
  {
    id: 3,
    name: 'Sam',
    avatar: avatar3,
    status: 'online',
    lastMessage: 'Hey everyone! How was your day?',
  },
  {
    id: 4,
    name: 'Jordan',
    avatar: avatar4,
    status: 'away',
    lastMessage: 'See you later!',
  },
];

const FriendsList = () => {
  return (
    <div className="h-full bg-sidebar-bg border-r border-border">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Friends</h2>
        <p className="text-sm text-muted-foreground">3 online</p>
      </div>
      
      <div className="overflow-y-auto">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors cursor-pointer group"
          >
            <div className="relative">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/50 transition-all"
              />
              <div className="absolute -bottom-1 -right-1">
                <Circle
                  className={`w-4 h-4 ${
                    friend.status === 'online'
                      ? 'text-accent-success fill-accent-success'
                      : 'text-accent-warning fill-accent-warning'
                  }`}
                />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground truncate">
                  {friend.name}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {friend.status === 'online' ? 'Online' : 'Away'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {friend.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;