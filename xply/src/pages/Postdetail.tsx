// pages/PostDetail.tsx
import { useState } from 'react';

export default function PostDetail() {
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(1400);

  const comments = [
    {
      id: 1,
      username: "@JeanetteGottlieb",
      time: "1 hours ago",
      text: "This sunflower is so vibrant! The colors just pop. It makes me feel so cheerful!"
    },
    {
      id: 2,
      username: "@FernandoPidrillo",
      time: "2 hours ago",
      text: "I love how the light hits it! It really brings out the texture of the petals. Such a warm feeling."
    },
    {
      id: 3,
      username: "@AngelaMayer",
      time: "3 hours ago",
      text: "Definitely gives off those Van Gogh vibes! It's like a little piece of art in nature."
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // Aquí iría la lógica para agregar el comentario
      console.log('Nuevo comentario:', comment);
      setComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#131230] to-[#702A4C] text-white pb-20">
      {/* Header con botón de volver */}
      <header className="p-4 border-b border-white/10 flex items-center">
        <button 
          onClick={() => window.history.back()}
          className="text-2xl mr-4"
        >
          ←
        </button>
        <h1 className="text-xl font-bold">Publication</h1>
      </header>

      {/* Contenido de la publicación */}
      <div className="p-4">
        {/* Título */}
        <h1 className="text-2xl font-bold mb-4">
          HOLLOW KNIGHT: SILKSONG SHATTERS RECORDS WITH AN ESTIMATED 5 MILLION PLAYERS IN ITS FIRST 3 DAYS
        </h1>

        {/* Estadísticas */}
        <div className="flex space-x-6 text-gray-400 text-sm mb-6">
          <span>24 COMMENTS</span>
          <span>{likes.toLocaleString()} LIKES</span>
        </div>

        {/* Imagen de la publicación */}
        <div className="bg-gray-800 h-80 rounded-lg mb-6 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400" 
            alt="Game content"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Acciones */}
        <div className="flex items-center space-x-6 mb-6">
          <button 
            onClick={handleLike}
            className="flex items-center space-x-2"
          >
            <span className={`text-2xl ${isLiked ? 'text-red-500' : 'text-gray-400'}`}>
              ♥
            </span>
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-400">
            <span className="text-2xl">💬</span>
            <span>Comment</span>
          </button>
        </div>

        {/* Sección de comentarios */}
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="border-b border-white/10 pb-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-[#C72C8D]">{comment.username}</span>
                <span className="text-gray-400 text-sm">{comment.time}</span>
              </div>
              <p className="text-gray-300">{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Input para comentar */}
        <form onSubmit={handleCommentSubmit} className="fixed bottom-0 left-0 right-0 bg-[#1B1E54] p-4 border-t border-white/10">
          <div className="flex space-x-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Message"
              className="flex-1 bg-[#2B1A40] rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-[#C72C8D] rounded-full px-6 py-2 font-semibold"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}