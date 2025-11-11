import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentPost, fetchComments, clearCurrentPost, fetchPosts } from "../slices/postsSlice";
import CommentItem from "../components/CommentItem";

export default function PostDetail() {
  const [scrollY, setScrollY] = useState(0);
  const [hiddenStart, setHiddenStart] = useState(0);
  const [comment, setComment] = useState("");
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Obtenemos el post actual y todos los posts
  const currentPost = useAppSelector((state) => state.posts.currentPost);
  const allPosts = useAppSelector((state) => state.posts.posts);
  const loading = useAppSelector((state) => state.posts.loading);

  // Primero cargamos los posts si no están cargados
  useEffect(() => {
    if (allPosts.length === 0 && !loading) {
      dispatch(fetchPosts());
    }
  }, [allPosts.length, loading, dispatch]);

  // Luego buscamos el post específico
  useEffect(() => {
    if (id && allPosts.length > 0) {
  const postId = parseInt(id);
      
      // Buscamos el post en la lista 
      const found = allPosts.find(p => (p.id as any) == postId);
      if (found) {
        dispatch(setCurrentPost(found.id));
        // Luego cargamos los comentarios
        dispatch(fetchComments(found.id));
      } else {
        console.warn('PostDetail: post no encontrado en allPosts', postId);
      }
    }

    return () => {
      dispatch(clearCurrentPost());
    };
  }, [id, allPosts.length, dispatch]);

  useEffect(() => {
    const computeHidden = () => {
      setHiddenStart(Math.round(window.innerHeight * 0.65));
    };
    computeHidden();
    window.addEventListener("resize", computeHidden);

    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", computeHidden);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const translateY = Math.max(hiddenStart - scrollY, 0);

  const handleSendComment = () => {
    if (comment.trim()) {
      setComment("");
    }
  };

  // Si no hay posts cargados aún, mostramos loading
  if (allPosts.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0821] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mb-4"></div>
        <p className="text-gray-400">Loading posts...</p>
        <p className="text-xs text-gray-500 mt-2">
          Posts en Redux: {allPosts.length} | Loading: {loading ? 'Yes' : 'No'}
        </p>
      </div>
    );
  }

  // Si no encontramos el post, mostramos error con más info
  if (!currentPost) {
    return (
      <div className="min-h-screen bg-[#0B0821] flex flex-col items-center justify-center text-white p-6">
        <span className="material-symbols-outlined text-6xl text-red-500 mb-4">
          error
        </span>
        <h2 className="text-2xl font-bold mb-2">Post not found</h2>
        <p className="text-gray-400 mb-2">The post you're looking for doesn't exist</p>
        <div className="bg-white/5 p-4 rounded-lg mb-6 text-sm text-left">
          <p className="text-gray-300">Debug info:</p>
          <p className="text-xs text-gray-400">ID buscado: {id}</p>
          <p className="text-xs text-gray-400">Posts disponibles: {allPosts.map(p => p.id).join(', ')}</p>
          <p className="text-xs text-gray-400">Total posts: {allPosts.length}</p>
        </div>
        <button
          onClick={() => navigate("/feed")}
          className="bg-pink-600 px-6 py-3 rounded-full hover:bg-pink-700 transition"
        >
          Back to Feed
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0821] text-white relative">
      {/* IMAGEN PRINCIPAL */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={currentPost.images[0]}
          alt="Post"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0821]/95 via-transparent to-transparent" />

        {/* botón back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-6 z-20 text-white text-2xl hover:text-pink-500 transition"
          aria-label="back"
        >
          ←
        </button>

        {/* INFO sobre la imagen */}
        <div className="absolute left-6 right-6 bottom-10 z-20">
          <p
            className="text-pink-500 text-sm mb-2"
            style={{ fontFamily: "Orkney, sans-serif" }}
          >
            @{currentPost.username}
          </p>

          <h1 className="text-2xl font-bold mb-2 line-clamp-2">
            {currentPost.title}
          </h1>


        </div>
      </div>

      {/* CAJA DE COMENTARIOS */}
      <div
        className="fixed left-0 right-0 bottom-0 z-30"
        style={{
          transform: `translateY(${translateY}px)`,
          transition: "transform 220ms cubic-bezier(.2,.9,.2,1)",
        }}
      >
        <div className="mx-4 mb-4 bg-[#181434]/95 backdrop-blur-xl rounded-t-3xl shadow-lg overflow-hidden">
          {/* contenido scrollable */}
          <div className="px-6 pt-6 pb-28 max-h-[55vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: "Orkney, sans-serif" }}
              >
                {currentPost.comments?.length || 0} COMMENTS
              </span>
              <span
                className="text-pink-500 font-semibold"
                style={{ fontFamily: "Orkney, sans-serif" }}
              >
                {currentPost.likes} ♥
              </span>
            </div>

            {/* Caption del post */}
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                {currentPost.body}
              </p>
            </div>

            {/* Loading state de comentarios */}
            {!currentPost.comments && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
              </div>
            )}

            {/* lista de comentarios */}
            <div className="space-y-5">
              {currentPost.comments?.map((c) => (
                <CommentItem
                  key={c.id}
                  user={c.name}
                  avatar={`https://i.pravatar.cc/100?img=${c.id}`}
                  time="Just now"
                  text={c.body}
                />
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="relative">
            <div className="px-4 pb-4 pt-2">
              <div className="bg-gradient-to-r from-[#131230] to-[#702A4C] rounded-full p-2 flex items-center gap-3">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
                  aria-label="write a comment"
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-300 px-3 py-2 text-sm"
                  placeholder="Write a comment..."
                />
                <button
                  onClick={handleSendComment}
                  className="bg-white/10 px-4 py-2 rounded-full text-white font-semibold hover:bg-white/20 transition"
                  aria-label="send"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "120vh" }} />
    </div>
  );
}