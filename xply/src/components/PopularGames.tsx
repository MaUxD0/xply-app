import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function PopularGames() {
  const games = [
    {
      title: "Valorant",
      img: "https://assets-prd.ignimgs.com/2021/12/21/valorant-1640045685890.jpg",
    },
    {
      title: "Expeditions: A MudRunner Game",
      img: "https://www.notebookcheck.org/fileadmin/Notebooks/News/_nc4/ClairObscurExpedition33Artwork.jpg",
    },
    {
      title: "Hollow Knight: Silksong",
      img: "https://cdn.wikimg.net/en/hkwiki/images/thumb/1/13/Silksong_cover.jpg/640px-Silksong_cover.jpg",
    },
    {
      title: "Fortnite",
      img: "https://image.api.playstation.com/vulcan/ap/rnd/202505/3100/ef79f649e45961a7e6342ebf26bc827b8b9603d69b2fdb5c.png?$100px$",
    },
    {
      title: "Minecraft",
      img: "https://assets-prd.ignimgs.com/2021/12/14/minecraft-1639513933156.jpg?crop=1%3A1%2Csmart&format=jpg&auto=webp&quality=80",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Título */}
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
          initialSlide={Math.floor(games.length / 2)}
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
          {games.map((game, index) => (
            <SwiperSlide
              key={index}
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



