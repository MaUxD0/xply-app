import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPosts, likePost } from "../slices/postsSlice";
import BottomNav from "../components/BottomNav";
import PopularGames from "../components/PopularGames";
import PostCard from "../components/PostCard";

export default function Feed() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Obtenemos los posts del estado de Redux
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  // Cargamos los posts cuando el componente se monta
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const handlePostClick = (id: number) => {
    navigate(`/post/${id}`);
  };

  const handleLike = (postId: number) => {
    dispatch(likePost(postId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090619] to-[#702A4C] text-white font-sans">
      {/* HEADER */}
      <header className="px-6 pt-6">
        <h1 className="font-['Anurati'] text-2xl tracking-widest mb-6">
          XPLY
        </h1>

        {/* POPULAR GAMES */}
        <section className="mt-4 mb-8">
          <PopularGames />
        </section>
      </header>

      {/* POSTS */}
      <main className="mt-8 space-y-10 px-4 pb-24">
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchPosts())}
              className="bg-pink-600 px-6 py-2 rounded-full hover:bg-pink-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Posts list */}
        {!loading && !error && posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            username={post.username}
            avatar={post.avatar}
            caption={post.body}
            likes={post.likes}
            images={post.images}
            onPostClick={handlePostClick}
            onLike={() => handleLike(post.id)}
          />
        ))}

        {/* Empty state */}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl mb-2">No posts yet</p>
            <p className="text-sm">Be the first to create one!</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
