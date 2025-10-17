
import { useState } from "react";
import ImageUploadButton from "../components/ImageUploadButton";
import ImagePreview from "../components/ImagePreview";
import TagSelector from "../components/TagSelector";

export default function CreatePost() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [caption, setCaption] = useState("");

  const tags = ["#gameplay", "#skyrim", "#challenge", "#adventure", "#rpg"];

  const handleImageSelect = (files: FileList) => {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (url: string) => {
    setImages(images.filter((img) => img !== url));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleUpload = () => {
    
    console.log({
      images,
      tags: selectedTags,
      caption,
    });
    window.location.href = "/feed";
  };

  const handleCancel = () => {
    window.location.href = "/feed";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090619] to-[#702A4C] text-white font-['Orkney'] p-6">
      {/* Título */}
      <h1 className="font-['Anurati'] text-3xl text-center mt-6 mb-2">
        CREATE A POST
      </h1>

      <hr className="border-[#6A5ACD]/30 mb-6 w-2/3 mx-auto" />

      {/* Upload y preview */}
      <div className="flex items-start justify-center gap-6 mb-8 overflow-x-auto flex-nowrap">
        <ImageUploadButton onImageSelect={handleImageSelect} />
        <ImagePreview images={images} onRemove={handleRemoveImage} />
      </div>
      {/* Hashtags */}
      <TagSelector
        tags={tags}
        selectedTags={selectedTags}
        onTagToggle={toggleTag}
      />

      {/* Área de texto */}
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Say what you think"
        className="w-full p-3 rounded-xl bg-gradient-to-r from-[#702A4C] to-[#090619] text-white placeholder-gray-400 outline-none mb-6"
        rows={4}
      />

      {/* Botones */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-900 px-8 py-2 rounded-full hover:bg-gray-400 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleUpload}
          className="bg-gradient-to-r from-[#090619] to-[#702A4C] text-white px-8 py-2 rounded-full hover:opacity-90 transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

