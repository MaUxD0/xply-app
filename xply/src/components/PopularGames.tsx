import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import gamesData from "../data/games.json";

export default function PopularGames() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-white text-lg font-semibold mb-4 font-['Anurati'] tracking-widest self-start px-6">
        POPULAR GAMES
      </h2>

      {/* Carrusel */}
      <div className="w-full flex justify-center">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3.5} 
          spaceBetween={-30} 
          initialSlide={Math.floor(gamesData.length / 2)}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="max-w-[850px] pb-8"
        >
          {gamesData.map((game) => (
            <SwiperSlide
              key={game.id}
              className="w-[160px] sm:w-[180px] md:w-[200px] h-[240px] rounded-2xl overflow-hidden transition-transform duration-300"
            >
              <img
                src={game.img}
                alt={game.title}
                className="w-full h-full object-cover rounded-2xl"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}



