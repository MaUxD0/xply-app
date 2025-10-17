
import { useEffect, useState } from "react";
import CommentItem from "../components/CommentItem";

export default function PostDetail() {
  const [scrollY, setScrollY] = useState(0);
  const [hiddenStart, setHiddenStart] = useState(0);
  const [comment, setComment] = useState("");

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

  const comments = [
    {
      user: "@JeanetteGottlieb",
      time: "1 hour ago",
      text: "This play was amazing! The soundtrack and atmosphere are perfect.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      user: "@FernandoPidrilio",
      time: "2 hours ago",
      text: "That boss fight was insane, love the new mechanics!",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      user: "@AngelaMayer",
      time: "3 hours ago",
      text: "Graphics are gorgeous. I want more DLC already.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];

  const handleSendComment = () => {
    if (comment.trim()) {
      console.log("Sending comment:", comment);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0821] text-white relative">
      {/* IMAGEN PRINCIPAL */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src="https://pbs.twimg.com/media/G0ZMO8RbgAUt2Jz.jpg:large"
          alt="Post"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0821]/95 via-transparent to-transparent" />

        {/* botón back */}
        <button
          onClick={() => window.history.back()}
          className="absolute left-4 top-6 z-20 text-white text-2xl hover:text-pink-500 transition"
          aria-label="back"
        >
          ←
        </button>

        {/* TITULO sobre la imagen */}
        <div className="absolute left-6 right-6 bottom-10 z-20">
          <p
            className="text-pink-500 text-sm mb-2"
            style={{ fontFamily: "Orkney, sans-serif" }}
          >
            IGN Entertainment
          </p>

          <div className="inline-block bg-pink-600/90 text-xs px-3 py-1 rounded-full mb-4 font-[Orkney]">
            NEWS
          </div>
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
                {comments.length} COMMENTS
              </span>
              <span
                className="text-pink-500 font-semibold"
                style={{ fontFamily: "Orkney, sans-serif" }}
              >
                1.4K ♥
              </span>
            </div>

            {/* lista de comentarios */}
            <div className="space-y-5">
              {comments.map((c, i) => (
                <CommentItem
                  key={i}
                  user={c.user}
                  avatar={c.avatar}
                  time={c.time}
                  text={c.text}
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
                  placeholder="Message"
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

