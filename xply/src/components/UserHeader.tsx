
interface UserHeaderProps {
  username: string;
  avatar: string;
  timestamp?: string;
}

export default function UserHeader({ username, avatar, timestamp }: UserHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-4">
      <img
        src={avatar}
        alt={username}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-white">{username}</h4>
        {timestamp && (
          <p className="text-xs text-gray-400">{timestamp}</p>
        )}
      </div>
    </div>
  );
}