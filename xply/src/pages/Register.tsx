
import { useState } from "react";
import FormField from "../components/FormField";

export default function Register() {
  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log({ email, password, image });
    window.location.href = "/";
  };

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#131230] to-[#702A4C]">
      <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl w-[90%] max-w-sm text-center shadow-lg border border-white/10 relative">
        {/* Botón de volver */}
        <button
          onClick={handleBack}
          className="absolute left-6 top-6 text-white text-2xl hover:text-[#C72C8D] transition"
          aria-label="Back"
        >
          ←
        </button>

        {/* Círculo de la cámara */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-14 w-24 h-24 rounded-full bg-[#1B1E54]/90 flex items-center justify-center border border-white/20 shadow-md">
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

        {/* Título */}
        <h2 className="text-white font-['Anurati'] text-2xl mt-10 mb-8">
          REGISTER
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

        <FormField
          type="password"
          placeholder="Confirm Password"
          icon="lock"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Botón de registro */}
        <button
          onClick={handleRegister}
          className="w-full py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#131230] to-[#702A4C] hover:opacity-90 transition"
        >
          REGISTER
        </button>
      </div>
    </div>
  );
}



