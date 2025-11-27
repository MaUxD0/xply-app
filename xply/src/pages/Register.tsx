// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signup } from "../slices/authSlice";
import FormField from "../components/FormField";

export default function Register() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async () => {
    // Validaciones
    if (!email || !password || !confirmPassword || !username) {
      alert("Please fill in all fields");
      return;
    }
    
    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await dispatch(signup({ 
        email, 
        password, 
        username,
        avatar: imageFile || undefined
      })).unwrap();
      
      navigate("/feed");
    } catch (err: any) {
      alert(err.message || "Registration failed");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#131230] to-[#702A4C]">
      <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl w-[90%] max-w-sm text-center shadow-lg border border-white/10 relative">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute left-6 top-6 text-white text-2xl hover:text-[#C72C8D] transition"
          aria-label="Back"
        >
          ←
        </button>

        {/* Avatar circle */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-14 w-24 h-24 rounded-full bg-[#1B1E54]/90 flex items-center justify-center border border-white/20 shadow-md">
          {imagePreview ? (
            <img
              src={imagePreview}
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

        <h2 className="text-white font-['Anurati'] text-2xl mt-10 mb-8">
          REGISTER
        </h2>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <FormField
          type="text"
          placeholder="Username"
          icon="person"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#131230] to-[#702A4C] hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Creating account...
            </>
          ) : (
            "REGISTER"
          )}
        </button>
      </div>
    </div>
  );
}


