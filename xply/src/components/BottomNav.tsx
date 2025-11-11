import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("home");

  // Actualiza el estado activo basado en la ruta actual
  useEffect(() => {
    if (location.pathname === "/feed") {
      setActive("home");
    } else if (location.pathname === "/create") {
      setActive("camera");
    } else if (location.pathname === "/profile") {
      setActive("profile");
    }
  }, [location.pathname]);

  // Maneja el cambio de pestaña usando React Router
  const handleClick = (page: string) => {
    setActive(page);
    
    if (page === "home") {
      navigate("/feed");
    } else if (page === "camera") {
      navigate("/create");
    } else if (page === "profile") {
      navigate("/profile");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0E0C2C] flex justify-around items-center py-3 z-50 shadow-lg">
      {/* Botón Home */}
      <div
        className={`relative flex flex-col items-center cursor-pointer transition-all ${
          active === "home" ? "text-white" : "text-gray-400"
        }`}
        onClick={() => handleClick("home")}
      >
        {active === "home" && (
          <div className="absolute -top-6 bg-[#0A0825] w-16 h-10 rounded-t-full transition-all duration-300"></div>
        )}
        <span className="material-symbols-outlined text-2xl z-10">home</span>
      </div>

      {/* Botón Cámara */}
      <div
        className={`relative flex flex-col items-center cursor-pointer transition-all ${
          active === "camera" ? "text-white" : "text-gray-400"
        }`}
        onClick={() => handleClick("camera")}
      >
        {active === "camera" && (
          <div className="absolute -top-6 bg-[#0A0825] w-16 h-10 rounded-t-full transition-all duration-300"></div>
        )}
        <span className="material-symbols-outlined text-2xl z-10">photo_camera</span>
      </div>

      {/* Botón Perfil */}
      <div
        className={`relative flex flex-col items-center cursor-pointer transition-all ${
          active === "profile" ? "text-white" : "text-gray-400"
        }`}
        onClick={() => handleClick("profile")}
      >
        {active === "profile" && (
          <div className="absolute -top-6 bg-[#0A0825] w-16 h-10 rounded-t-full transition-all duration-300"></div>
        )}
        <span className="material-symbols-outlined text-2xl z-10">person</span>
      </div>
    </div>
  );
};

export default BottomNav;


