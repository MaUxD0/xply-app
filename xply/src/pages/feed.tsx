
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPosts, toggleLike } from "../slices/postsSlice";
import BottomNav from "../components/BottomNav";
import PopularGames from "../components/PopularGames";
import PostCard from "../components/PostCard";

export default function Feed() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const filteredPosts = useAppSelector((state) => state.posts.filteredPosts);
  const allPosts = useAppSelector((state) => state.posts.posts);
  const loading = useAppSelector((state) => state.posts.loading);
  const error = useAppSelector((state) => state.posts.error);
  const selectedGame = useAppSelector((state) => state.posts.selectedGame);

  useEffect(() => {
    if (allPosts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, allPosts.length]);

  const handlePostClick = (id: number) => {
    navigate(`/post/${id}`);
  };

  const handleLike = async (postId: number) => {
    if (!user) {
      alert('You must be logged in to like posts');
      return;
    }
    
    try {
      await dispatch(toggleLike(postId)).unwrap();
    } catch (error: any) {
      alert(error.message || 'Failed to like post');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090619] to-[#702A4C] text-white font-sans">
      <header className="px-6 pt-6">
        <h1 className="font-['Anurati'] text-2xl tracking-widest mb-6">
          XPLY
        </h1>

        <section className="mt-4 mb-8">
          <PopularGames />
        </section>
      </header>

      <main className="mt-8 pb-24">
        <div className="max-w-2xl mx-auto px-4 space-y-10">
          {selectedGame && (
            <div className="bg-pink-600/20 border border-pink-600/50 rounded-2xl p-4 text-center">
              <p className="text-pink-200 text-sm">
                Showing posts for: <strong>{selectedGame}</strong>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
              </p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          )}

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

          {!loading && !error && filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              username={post.username}
              avatar={post.avatar_url || `https://i.pravatar.cc/100?img=${post.user_id}`}
              caption={post.body}
              likes={post.likes}
              isLiked={post.has_liked}
              images={post.images}
              onPostClick={handlePostClick}
              onLike={() => handleLike(post.id)}
            />
          ))}

          {!loading && !error && filteredPosts.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <span className="material-symbols-outlined text-6xl mb-4 block">
                videogame_asset_off
              </span>
              <p className="text-xl mb-2">No posts found</p>
              {selectedGame ? (
                <p className="text-sm">No posts for "{selectedGame}" yet. Be the first!</p>
              ) : (
                <p className="text-sm">Be the first to create one!</p>
              )}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}