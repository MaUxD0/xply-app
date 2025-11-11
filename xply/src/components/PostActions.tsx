

interface PostActionsProps {
  likes: number;
  isLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onBookmark?: () => void;
}

export default function PostActions({
  likes,
  isLiked,
  onLike,
  onComment,
  onBookmark,
}: PostActionsProps) {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-10 bg-black/40 backdrop-blur-md py-2 rounded-full mx-10 z-50">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
            onLike?.();
        }}
        className="flex items-center gap-1 cursor-pointer pointer-events-auto"
        aria-label="Like post"
      >
        <span className={`material-symbols-outlined ${isLiked ? 'text-pink-500' : 'text-white'}`}>
          {isLiked ? 'favorite' : 'favorite_border'}
        </span>
        {likes > 0 && (
          <span className="text-white text-sm">{likes}</span>
        )}
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onComment?.();
        }}
        aria-label="Comment"
        className="cursor-pointer pointer-events-auto"
      >
        <span className="material-symbols-outlined text-white">
          chat_bubble
        </span>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onBookmark?.();
        }}
        aria-label="Bookmark"
        className="cursor-pointer pointer-events-auto"
      >
        <span className="material-symbols-outlined text-white">
          bookmark
        </span>
      </button>
    </div>
  );
}