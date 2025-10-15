// Función para manejar el login 
  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir comportamiento por defecto
    // Redirigir al feed después del login
    window.location.href = "/feed";
  };
// Este componente representa la pantalla de Login de XPLY.
// Se enfoca en el diseño y estructura visual.
export default function Login() {
  return (
    // Fondo principal con un degradado vertical oscuro.
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#131230] to-[#702A4C]">
      {/* Contenedor del formulario con efecto translúcido y bordes redondeados */}
      <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl w-[90%] max-w-sm text-center shadow-lg border border-white/10">
<div className="flex justify-center mb-6">
  <div className="relative w-24 h-24 rounded-full bg-[#1B1E54] overflow-hidden flex items-center justify-center">
    {/* Cabeza */}
    <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-10 h-10 bg-[#C72C8D] rounded-full"></div>
    {/* Semicírculo inferior */}
    <div className="absolute bottom-[-10%] left-0 w-full h-1/2 bg-[#C72C8D] rounded-t-full"></div>
  </div>
</div>




        {/* Título */}
        <h2 className="text-white font-['Anurati'] text-xl mb-6 tracking-widest">
          LOGIN
        </h2>

        {/* Campo de correo electrónico */}
        <div className="text-left mb-4">
          {/* Ícono de sobre */}
          <label className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="material-symbols-outlined text-white text-lg">
              mail
            </span>
            <input
              type="email"
              placeholder="Email ID"
              className="w-full bg-transparent border-b border-gray-500 focus:outline-none text-white placeholder-gray-400 text-sm py-1"
            />
          </label>
        </div>

        {/* Campo de contraseña */}
        <div className="text-left mb-6">
          {/* Ícono de candado */}
          <label className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="material-symbols-outlined text-white text-lg">
              lock
            </span>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border-b border-gray-500 focus:outline-none text-white placeholder-gray-400 text-sm py-1"
            />
          </label>
        </div>

        {/* Botón de Login con gradiente */}
        <button
        onClick={handleLogin} // ← ESTA ES LA LÍNEA IMPORTANTE
          className="w-full py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#090619] to-[#702A4C] hover:opacity-90 transition mb-3"
        >
          LOGIN
        </button>

      <button
  onClick={() => (window.location.href = "/register")}
  className="w-full py-2 rounded-full text-white font-semibold bg-[#2B1A40] hover:opacity-80 transition"
>
  REGISTER
</button>

      </div>
    </div>
  );
}
