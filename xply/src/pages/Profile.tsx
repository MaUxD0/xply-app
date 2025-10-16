import { useState } from "react";
import BottomNav from "../components/BottomNav";

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
    <div className="min-h-screen bg-gradient-to-b from-[#0B0C23] to-[#3C003B] text-white font-sans pb-24">
      
      {/* BANNER DE PORTADA */}
      <div className="relative h-64 overflow-hidden">
        {/* Texto PROFILE arriba a la izquierda */}
        <div className="absolute top-4 left-6 z-20">
          <h1 className="text-white text-lg font-bold tracking-wider">PROFILE</h1>
        </div>
        
        {/* Banner */}
        <img
          src="https://www.chilevision.cl/chilevision/site/artic/20220331/imag/foto_0000000820220331191217/doom_alt_boxart.0.0.jpg"
          alt="cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0B0C23]"></div>
      </div>

      {/* SECCIÓN DE PERFIL CON SEMICÍRCULO */}
      <div className="relative -mt-24">
        
        {/* SEMICÍRCULO ROSADO - GRANDE, OCUPA TODO EL ANCHO */}
        <div className="w-full h-56 bg-pink-600" style={{ borderRadius: '50% 50% 0 0' }}></div>
        
        {/* AVATAR - EN EL CENTRO */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30">
          <img
            src={avatar}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-black object-cover shadow-2xl"
          />
        </div>
        
        {/* USERNAME */}
        <div className="absolute top-52 left-1/2 -translate-x-1/2 z-30">
          <h2 className="text-white text-base font-medium">@Stevgame</h2>
        </div>
      </div>

      {/* FOLLOWERS, BOTONES Y FOLLOWING */}
      <div className="flex items-end justify-between px-6 mt-8">
        
        {/* 300 FOLLOWERS - IZQUIERDA */}
        <div className="text-left">
          <p className="text-3xl font-bold text-white mb-1">300</p>
          <p className="text-xs text-gray-300">Followers</p>
        </div>

        {/* BOTONES CENTRALES */}
        <div className="flex gap-2 mb-1">
          <button className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-base">add</span>
          </button>
          
          <label className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined text-white text-base">photo_camera</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
          
          <button className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-base">favorite</span>
          </button>
        </div>

        {/* 100 FOLLOWING - DERECHA */}
        <div className="text-right">
          <p className="text-3xl font-bold text-white mb-1">100</p>
          <p className="text-xs text-gray-300">Following</p>
        </div>
      </div>

      {/* FAVORITE GAMES */}
      <div className="px-6 mt-12">
        <section className="mt-8">
          <h2 className="font-['Anurati'] text-xl text-center mb-4">
            FAVORITE GAMES
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {favoriteGames.map((game, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 rounded-xl overflow-hidden bg-white/10 border border-white/10"
              >
                <img
                  src={game.img}
                  alt={game.title}
                  className="w-full h-44 object-cover"
                />
                <p className="text-sm text-center py-2">{game.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEED MASONRY */}
        <section className="mt-6 columns-2 gap-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`mb-2 overflow-hidden rounded-xl bg-white/5 border border-white/10`}
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

      <BottomNav onNavigate={(page) => console.log("Ir a:", page)} />
    </div>
  );
}
