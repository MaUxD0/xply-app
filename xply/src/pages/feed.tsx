import { useState } from "react";

const postsData = [
  {
    id: 1,
    username: "IGN Entertainment",
    avatar: "https://i.pravatar.cc/100?img=5",
    caption:
      "HOLLOW KNIGHT: SILKSONG SHATTERS RECORDS WITH AN ESTIMATED 5 MILLION PLAYERS IN ITS FIRST 3 DAYS",
    likes: 1400,
    images: [
      "https://pbs.twimg.com/media/G0ZMO8RbgAUt2Jz.jpg:large",
      "https://sm.ign.com/t/ign_nordic/news/h/hollow-kni/hollow-knight-silksong-developer-responds-to-release-date-co_9trv.1200.jpg",
    ],
  },
  {
    id: 2,
    username: "James KJ.",
    avatar: "https://i.pravatar.cc/100?img=12",
    caption: "This play was amazing, comment what challen... more",
    likes: 12400,
    images: [
      "https://cdn.mos.cms.futurecdn.net/csQgknvLgV4P4ABbFSZdrE.jpg",
      "https://sm.ign.com/t/ign_za/video/f/fortnite-o/fortnite-official-fortnitemares-2025-cinematic-short-trailer_aed2.1280.jpg",
    ],
  },
  {
    id: 3,
    username: "RedeadPosting",
    avatar: "https://i.pravatar.cc/100?img=32",
    caption: "The best game ever, Arthur you are a legend... more",
    likes: 9860,
    images: ["https://preview.redd.it/i-played-arthurs-last-mission-v0-hwygewohqhdd1.jpeg?auto=webp&s=0c3287619ba559cff1ac30d22d5dbf4bc2b2a364"],
  },
];

export default function Feed() {
  const [posts] = useState(postsData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0C23] to-[#3C003B] text-white font-sans">
      {/* HEADER */}
      <header className="px-6 pt-6">
        <h1 className="font-['Anurati'] text-2xl tracking-widest mb-6">
          XPLY
        </h1>

        {/* POPULAR GAMES */}
        <h2 className="text-lg font-semibold mb-3">POPULAR GAMES</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          <img
            src="https:"
            alt="Silksong"
            className="w-40 h-56 object-cover rounded-xl shadow-md"
          />
          <img
            src="https:"
            alt="Fortnite"
            className="w-40 h-56 object-cover rounded-xl shadow-md"
          />
          <img
            src="https:"
            alt="Red Dead"
            className="w-40 h-56 object-cover rounded-xl shadow-md"
          />
          <img
            src="https:"
            alt="Minecraft"
            className="w-40 h-56 object-cover rounded-xl shadow-md"
          />
        </div>
      </header>

      {/* POSTS */}
      <main className="mt-8 space-y-10 px-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Header de usuario */}
            <div className="flex items-center gap-3 p-4">
              <img
                src={post.avatar}
                alt={post.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">{post.username}</h4>
              </div>
            </div>

            {/* Imagen o carrusel */}
            <div className="relative w-full">
              {post.images.length > 1 ? (
                <div className="flex overflow-x-auto snap-x snap-mandatory">
                  {post.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      className="w-full h-72 object-cover flex-shrink-0 snap-center"
                    />
                  ))}
                </div>
              ) : (
                <img
                  src={post.images[0]}
                  alt="Post"
                  className="w-full h-72 object-cover"
                />
              )}

              {/* Overlay de botones */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-10 bg-black/40 backdrop-blur-md py-2 rounded-full mx-10">
                <span className="material-symbols-outlined text-pink-500 cursor-pointer">
                  favorite
                </span>
                <span className="material-symbols-outlined text-white cursor-pointer">
                  chat_bubble
                </span>
                <span className="material-symbols-outlined text-white cursor-pointer">
                  bookmark
                </span>
              </div>
            </div>

            {/* Texto */}
            <div className="p-4">
              <p className="text-sm text-gray-300">{post.caption}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

