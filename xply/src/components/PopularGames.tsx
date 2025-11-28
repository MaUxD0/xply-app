import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { filterByGame } from "../slices/postsSlice";

export default function PopularGames() {
  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector((state) => state.posts.selectedGame);

  const games = [
    { title: "GTA V", img: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg" },
    { title: "Alan Wake", img: "https://media.rawg.io/media/games/5c0/5c0dd63002cb23f804aab327d40ef119.jpg" },
    { title: "BioShock infinite", img: "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg" },
    { title: "Horizon Zero Dawn", img: "https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg" },
    { title: "Fallout 4", img: "https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg" },
    { title: "Skyrim", img: "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg" },
    { title: "The Witcher 3", img: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg" },
    { title: "Rocket League", img: "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg" },
    { title: "Tomb Raider", img: "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg" },
  ];

  const handleGameClick = (gameTitle: string) => {
    if (selectedGame === gameTitle) {
      dispatch(filterByGame(null));
    } else {
      dispatch(filterByGame(gameTitle));
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-full px-6 mb-4">
        <h2 className="text-white text-lg font-semibold font-['Anurati'] tracking-widest">
          POPULAR GAMES
        </h2>
        
        {selectedGame && (
          <button
            onClick={() => dispatch(filterByGame(null))}
            className="text-xs bg-pink-600 px-3 py-1 rounded-full hover:bg-pink-700 transition flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">close</span>
            Clear filter
          </button>
        )}
      </div>

      <div className="w-full flex justify-center">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2.2} // Más grande en móvil
          spaceBetween={10}
          initialSlide={Math.floor(games.length / 2)}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          breakpoints={{
            
            320: {
              slidesPerView: 2.2,
              spaceBetween: 10,
            },
         
            640: {
              slidesPerView: 2.8,
              spaceBetween: 15,
            },
         
            768: {
              slidesPerView: 3.5,
              spaceBetween: -30,
            },
          }}
          className="w-full max-w-[850px] pb-8"
        >
          {games.map((game, index) => (
            <SwiperSlide
              key={index}
              className="rounded-2xl overflow-hidden transition-transform duration-300 cursor-pointer"
              onClick={() => handleGameClick(game.title)}
            >
              <div className="relative w-full h-56 sm:h-64 md:h-60">
                <img
                  src={game.img}
                  alt={game.title}
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
                
                {selectedGame === game.title && (
                  <div className="absolute inset-0 bg-pink-600/40 flex items-center justify-center rounded-2xl">
                    <span className="material-symbols-outlined text-white text-5xl">
                      check_circle
                    </span>
                  </div>
                )}
                
                <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 py-3">
                  <p className="text-sm md:text-base text-white font-semibold truncate text-center">
                    {game.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

