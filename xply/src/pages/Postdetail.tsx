import { useEffect, useState } from "react";



export default function PostDetail() {
  // scroll actual del window (lo usamos para mover la caja)
  const [scrollY, setScrollY] = useState(0);
  // distancia en px que la caja estará inicialmente fuera de la vista (oculta)
  const [hiddenStart, setHiddenStart] = useState(0);

  useEffect(() => {
    // calculamos cuánto tiene que "bajar" la caja inicialmente,
    // lo hacemos relativo al alto de la ventana para que sea consistente en móviles/desktop
    const computeHidden = () => {
      setHiddenStart(Math.round(window.innerHeight * 0.65)); // 65% de la ventana
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

  // calculamos la translateY que aplicamos a la caja:
  // empieza en hiddenStart (total fuera) y al hacer scroll baja hasta 0 (visible)
  const translateY = Math.max(hiddenStart - scrollY, 0);

  // datos de ejemplo
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

  return (
    <div className="min-h-screen bg-[#0B0821] text-white relative">
      {/* IMAGEN PRINCIPAL */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src="https://pbs.twimg.com/media/G0ZMO8RbgAUt2Jz.jpg:large"
          alt="Post"
          className="w-full h-full object-cover"
        />

        {/* overlay suave para asegurar legibilidad del título */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0821]/95 via-transparent to-transparent" />

        {/* botón back (simple) */}
        <button
          onClick={() => window.history.back()}
          className="absolute left-4 top-6 z-20 text-white text-2xl"
          aria-label="back"
        >
          ←
        </button>

        {/* TITULO sobre la imagen  */}
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

      {/* CAJA DE COMENTARIOS: fixed bottom, la movemos con translateY */}
      <div
        className="fixed left-0 right-0 bottom-0 z-30"
        style={{
          transform: `translateY(${translateY}px)`,
          transition: "transform 220ms cubic-bezier(.2,.9,.2,1)",
        }}
      >
        {/* panel visual */}
        <div className="mx-4 mb-4 bg-[#181434]/95 backdrop-blur-xl rounded-t-3xl shadow-lg overflow-hidden">
          {/* contenido scrollable de la caja: ponemos padding-bottom para que el input no tape contenido */}
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
                <div key={i} className="flex gap-3 items-start">
                  <img
                    src={c.avatar}
                    alt={c.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span style={{ fontFamily: "Orkney, sans-serif" }}>
                        {c.user}
                      </span>
                      <span className="text-right">{c.time}</span>
                    </div>
                    <p
                      className="text-sm text-gray-200 mt-1"
                      style={{ fontFamily: "Orkney, sans-serif" }}
                    >
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input siempre visible (dentro de la misma caja) */}
          <div className="relative">
            <div className="px-4 pb-4 pt-2">
              <div className="bg-gradient-to-r from-[#131230] to-[#702A4C] rounded-full p-2 flex items-center gap-3">
                <input
                  aria-label="write a comment"
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-300 px-3 py-2 text-sm"
                  placeholder="Message"
                />
                <button
                  className="bg-white/10 px-4 py-2 rounded-full text-white font-semibold"
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

