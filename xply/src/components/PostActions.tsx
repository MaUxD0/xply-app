

interface PostActionsProps {
  likes: number;
  onLike?: () => void;
  onComment?: () => void;
  onBookmark?: () => void;
}

export default function PostActions({
  likes,
  onLike,
  onComment,
  onBookmark,
}: PostActionsProps) {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-10 bg-black/40 backdrop-blur-md py-2 rounded-full mx-10">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onLike?.();
        }}
        className="flex items-center gap-1"
        aria-label="Like post"
      >
        <span className="material-symbols-outlined text-pink-500">
          favorite
        </span>
        {likes > 0 && (
          <span className="text-white text-sm">{likes}</span>
        )}
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onComment?.();
        }}
        aria-label="Comment"
      >
        <span className="material-symbols-outlined text-white">
          chat_bubble
        </span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onBookmark?.();
        }}
        aria-label="Bookmark"
      >
        <span className="material-symbols-outlined text-white">
          bookmark
        </span>
      </button>
    </div>
  );
}