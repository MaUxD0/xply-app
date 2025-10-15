import { useState } from "react";

export default function Register() {
  // guardamos la imagen que el usuario sube
  const [image, setImage] = useState<string | null>(null);

  // al subir una imagen se crea la vista previa
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#131230] to-[#702A4C]">
      {/* contenedor principal  */}
      <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl w-[90%] max-w-sm text-center shadow-lg border border-white/10">
        
        {/* botón de volver al login */}
        <button
          onClick={() => (window.location.href = "/")}
          className="absolute left-6 top-6 text-white text-2xl hover:text-[#C72C8D] transition"
        >
          ←
        </button>

        {/* círculo de la cámara */}
       <div className="absolute left-1/2 -translate-x-1/2 -top-14 transform w-24 h-24 rounded-full bg-[#1B1E54]/90 flex items-center justify-center border border-white/20 shadow-md">


          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <label htmlFor="fileInput" className="cursor-pointer">
              <span className="material-symbols-outlined text-[#C72C8D] text-4xl">
                photo_camera
              </span>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* título */}
        <h2 className="text-white font-['Anurati'] text-2xl mt-10 mb-8">
          REGISTER
        </h2>

        {/* campos del formulario */}
        <input
          type="email"
          placeholder="Email ID"
          className="w-full mb-4 bg-transparent border-b border-gray-400 text-white text-sm focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 bg-transparent border-b border-gray-400 text-white text-sm focus:outline-none"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-6 bg-transparent border-b border-gray-400 text-white text-sm focus:outline-none"
        />

        {/* botón principal */}
        <button className="w-full py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#131230] to-[#702A4C] hover:opacity-90 transition">
          REGISTER
        </button>
      </div>
    </div>
  );
}




