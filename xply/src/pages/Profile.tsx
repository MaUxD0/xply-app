import { useState } from "react";
import BottomNav from "../components/BottomNav";
import GameCard from "../components/GameCard";

export default function Profile() {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/300?img=12");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleNavigate = (page: string) => {
    if (page === "home") {
      window.location.href = "/feed";
    } else if (page === "camera") {
      window.location.href = "/create";
    } else if (page === "profile") {
      window.location.href = "/profile";
    }
  };

  const favoriteGames = [
    {
      title: "Cyberpunk 2077",
      img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    },
    {
      title: "Zelda: Breath of the Wild",
      img: "https://media.es.wired.com/photos/638fd68c7db986e0c2d6b19a/master/pass/Breath-of-the-Wild-Casual-Gamer-Culture.jpg",
    },
    {
      title: "Skyrim",
      img: "https://i.blogs.es/8ad064/skyrim-secretos-curiosidades/1366_2000.jpeg",
    },
  ];

  const posts = [
    {
      id: 1,
      img: "https://media.revistagq.com/photos/606343697e6648d674c91afc/16:9/w_1280,c_limit/Cyberpunk-2077.jpeg",
      aspect: "aspect-[3/4]",
    },
    {
      id: 2,
      img: "https://hips.hearstapps.com/hmg-prod/images/red-dead-redemption-2-1540300058.jpg",
      aspect: "aspect-[16/9]",
    },
    {
      id: 3,
      img: "https://static.independentespanol.com/2020/12/08/10/newFile-4.jpg",
      aspect: "aspect-[4/3]",
    },
    {
      id: 4,
      img: "https://alfabetajuega.com/hero/2024/07/zelda-tears-of-the-kingdom.1720100177.7727.jpg?width=1200",
      aspect: "aspect-[3/4]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#702A4C] to-[#090619] text-white font-sans pb-24">
      {/* BANNER DE PORTADA*/}
      <div className="relative h-80 overflow-hidden">
        {/* Imagen de portada de fondo */}
        <img
          src="https://image.api.playstation.com/vulcan/ap/rnd/202505/3100/ef79f649e45961a7e6342ebf26bc827b8b9603d69b2fdb5c.png"
          alt="cover"
          className="w-full h-full object-cover"
        />
        
        {/* Gradiente oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#702A4C]"></div>

        {/* Texto PROFILE */}
        <div className="absolute top-6 left-6 z-20">
          <h1 className="text-white font-['Anurati'] text-lg tracking-widest">PROFILE</h1>
        </div>

        {/* AVATAR */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="relative">
            <img
              src={avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-white/20 object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* USERNAME  */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-center">
          <h2 className="text-white text-lg font-medium font-['Orkney']">@Stevgame</h2>
        </div>
      </div>

      {/* SECCIÓN DE ESTADÍSTICAS Y BOTONES */}
      <div className="px-6 mt-8">
        {/* FOLLOWERS, BOTONES Y FOLLOWING */}
        <div className="flex items-center justify-between">
          {/* FOLLOWERS */}
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">300</p>
            <p className="text-xs text-gray-300 font-['Orkney']">Followers</p>
          </div>

          {/* BOTONES CENTRALES */}
          <div className="flex gap-4 items-center">
            {/* Botón Add */}
            <button className="hover:opacity-70 transition">
              <span className="material-symbols-outlined text-[#C72C8D] text-3xl">add_circle</span>
            </button>

            {/* Botón Cámara - para cambiar avatar */}
            <label className="cursor-pointer hover:opacity-70 transition">
              <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>

            {/* Botón Favorito */}
            <button className="hover:opacity-70 transition">
              <span className="material-symbols-outlined text-[#FF0099] text-3xl">favorite</span>
            </button>
          </div>

          {/* FOLLOWING */}
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">100</p>
            <p className="text-xs text-gray-300 font-['Orkney']">Following</p>
          </div>
        </div>

        {/* FAVORITE GAMES */}
        <section className="mt-12">
          <h2 className="font-['Anurati'] text-xl text-center mb-6 tracking-wider">
            FAVORITE GAMES
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {favoriteGames.map((game, i) => (
              <GameCard
                key={i}
                title={game.title}
                img={game.img}
                onClick={() => console.log("Clicked:", game.title)}
              />
            ))}
          </div>
        </section>

        {/* LÍNEA */}
        <div className="mt-8 mb-6">
          <hr className="border-t border-[#6A5ACD]/30 w-full" />
        </div>

        {/* FEED MASONRY */}
        <section className="columns-2 gap-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="mb-2 overflow-hidden rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:opacity-80 transition"
              onClick={() => (window.location.href = `/post/${post.id}`)}
            >
              <img
                src={post.img}
                alt=""
                className={`w-full object-cover ${post.aspect}`}
              />
            </div>
          ))}
        </section>
      </div>

      <BottomNav onNavigate={handleNavigate} />
    </div>
  );
}

