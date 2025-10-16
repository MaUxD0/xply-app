import { useState } from "react";

export default function CreatePost() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = ["#gameplay", "#skyrim", "#challenge", "#adventure", "#rpg"];

  // Subir imágenes
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  // Eliminar imagen subida
  const handleRemoveImage = (url: string) => {
    setImages(images.filter((img) => img !== url));
  };

  // Seleccionar hashtags
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090619] to-[#702A4C] text-white font-['Orkney'] p-6">
      {/* Título */}
      <h1 className="font-['Anurati'] text-3xl text-center mt-6 mb-2">
        CREATE A POST
      </h1>

      <hr className="border-[#6A5ACD]/30 mb-6 w-2/3 mx-auto" />

      {/* Upload y preview lado a lado */}
<div className="flex items-start justify-center gap-6 mb-8 overflow-x-auto flex-nowrap">
  {/* Subir foto */}
  <label className="flex flex-col items-center justify-center w-36 h-36 border-2 border-dashed border-[#FF0099]/40 rounded-2xl cursor-pointer hover:bg-white/5 transition flex-shrink-0">
    <span className="material-symbols-outlined text-[#FF0099] text-4xl mb-2">
      add_a_photo
    </span>
    <p className="text-sm text-gray-300">Upload a photo</p>
    <input
      type="file"
      accept="image/*"
      multiple
      className="hidden"
      onChange={handleImageUpload}
    />
  </label>

  {/* Imágenes subidas */}
  <div className="flex gap-4 flex-nowrap overflow-x-auto flex-shrink-0">
    {images.map((img, idx) => (
      <div key={idx} className="relative flex-shrink-0">
        <img
          src={img}
          alt="upload"
          className="w-36 h-36 object-cover rounded-2xl"
        />
        <button
          onClick={() => handleRemoveImage(img)}
          className="absolute top-2 right-2 bg-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm hover:bg-pink-700"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</div>


      {/* Hashtags */}
      <div className="mb-8">
        <p className="flex items-center gap-2 text-[#FF0099] mb-3">
          <span className="material-symbols-outlined text-lg">sell</span> #hashtag
        </p>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                selectedTags.includes(tag)
                  ? "bg-[#FF0099] text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Área de texto */}
      <textarea
        placeholder="Say what you think"
        className="w-full p-3 rounded-xl bg-gradient-to-r from-[#702A4C] to-[#090619] text-white placeholder-gray-400 outline-none mb-6"
        rows={4}
      ></textarea>

      <div className="flex justify-between mt-8">
  {/* Botón de Cancelar */}
  <button
    onClick={() => (window.location.href = "/feed")}
    className="bg-gray-300 text-gray-900 px-8 py-2 rounded-full hover:bg-gray-400 transition"
  >
    Cancel
  </button>

  {/* Botón de Subir */}
  <button
    onClick={() => (window.location.href = "/feed")}
    className="bg-gradient-to-r from-[#090619] to-[#702A4C] text-white px-8 py-2 rounded-full hover:opacity-90 transition"
  >
    Upload
  </button>
</div>

    </div>
  );
}

