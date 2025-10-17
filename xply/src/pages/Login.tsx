
import { useState } from "react";
import FormField from "../components/FormField";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log({ email, password });
    window.location.href = "/feed";
  };

  const handleRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#131230] to-[#702A4C]">
      <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl w-[90%] max-w-sm text-center shadow-lg border border-white/10">
        {/* Avatar */}
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

        {/* Campos del formulario */}
        <FormField
          type="email"
          placeholder="Email ID"
          icon="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormField
          type="password"
          placeholder="Password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Botón de Login */}
        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#090619] to-[#702A4C] hover:opacity-90 transition mb-3"
        >
          LOGIN
        </button>

        {/* Botón de Register */}
        <button
          onClick={handleRegister}
          className="w-full py-2 rounded-full text-white font-semibold bg-[#2B1A40] hover:opacity-80 transition"
        >
          REGISTER
        </button>
      </div>
    </div>
  );
}
