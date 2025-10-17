

interface CommentItemProps {
  user: string;
  avatar: string;
  time: string;
  text: string;
}

export default function CommentItem({ user, avatar, time, text }: CommentItemProps) {
  return (
    <div className="flex gap-3 items-start">
      <img
        src={avatar}
        alt={user}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span style={{ fontFamily: "Orkney, sans-serif" }}>
            {user}
          </span>
          <span className="text-right">{time}</span>
        </div>
        <p
          className="text-sm text-gray-200 mt-1"
          style={{ fontFamily: "Orkney, sans-serif" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}