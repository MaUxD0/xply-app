import UserHeader from "./UserHeader";
import ImageCarousel from "./ImageCarousel";
import PostActions from "./PostActions";

interface PostCardProps {
  id: number;
  username: string;
  avatar: string;
  caption: string;
  likes: number;
  images: string[];
  onPostClick?: (id: number) => void;
  onLike?: () => void;
}

export default function PostCard({
  id,
  username,
  avatar,
  caption,
  likes,
  images,
  onPostClick,
  onLike,
}: PostCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg">
      {/* Header de usuario */}
      <UserHeader username={username} avatar={avatar} />

      {/* Imagen o carrusel */}
      <div
        className="relative w-full cursor-pointer"
        onClick={() => onPostClick?.(id)}
      >
        <ImageCarousel images={images} />

        {/* Overlay de botones */}
        <PostActions 
          likes={likes}
          onLike={onLike}
        />
      </div>

      {/* Texto */}
      <div className="p-4">
        <p className="text-sm text-gray-300">{caption}</p>
      </div>
    </div>
  );
}