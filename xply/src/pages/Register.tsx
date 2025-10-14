import { useState } from "react";

export default function Register() {
  // Estado para guardar la imagen subida por el usuario
  const [image, setImage] = useState<string | null>(null);

  // Esta función maneja el evento cuando el usuario selecciona una imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      // Convertimos la imagen en base64 para poder mostrarla directamente
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    // Fondo 
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#131230] to-[#702A4C]">
      {/* Contenedor del formulario con efecto translúcido y bordes redondeados */}
      <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl w-[90%] max-w-sm text-center shadow-lg border border-white/10">
        
        
        <div className="relative w-24 h-24 rounded-full bg-[#1B1E54] overflow-hidden flex items-center justify-center mb-6 border-2 border-[#C72C8D]">
          {image ? (
            // Si el usuario sube una imagen, se muestra dentro del círculo
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            // Si no hay imagen, mostramos el ícono de cámara centrado
            <>
              <label
                htmlFor="fileInput"
                className="cursor-pointer text-3xl text-[#C72C8D] hover:text-[#e83cab] transition"
              >
                📷
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </>
          )}
        </div>

        {/* Título */}
        <h2 className="text-white font-['Anurati'] text-xl mb-6 tracking-widest">
          REGISTER
        </h2>

        {/* Campos del formulario */}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 bg-transparent border-b border-gray-400 text-white text-sm focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email ID"
          className="w-full mb-4 bg-transparent border-b border-gray-400 text-white text-sm focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 bg-transparent border-b border-gray-400 text-white text-sm focus:outline-none"
        />

        {/* Botones */}
        <button className="w-full py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#131230] to-[#702A4C] hover:opacity-90 transition mb-3">
          REGISTER
        </button>

        <button
          onClick={() => (window.location.href = "/")}
          className="w-full py-2 rounded-full text-white font-semibold bg-[#2B1A40] hover:opacity-80 transition"
        >
          BACK TO LOGIN
        </button>
      </div>
    </div>
  );
}
