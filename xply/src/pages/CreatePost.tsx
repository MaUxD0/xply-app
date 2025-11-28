import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createPost } from "../slices/postsSlice";
import ImageUploadButton from "../components/ImageUploadButton";
import TagSelector from "../components/TagSelector";

export default function CreatePost() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [gameName, setGameName] = useState(""); // Campo libre para el juego
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const tags = ["#gameplay", "#skyrim", "#challenge", "#adventure", "#rpg"];

  const handleImageSelect = (files: FileList) => {
    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleUpload = async () => {
    if (imageFiles.length === 0) {
      alert("Please add at least one image");
      return;
    }
    
    if (!caption.trim()) {
      alert("Please add a caption");
      return;
    }
    
    if (!user) {
      alert("You must be logged in to create a post");
      return;
    }

    setLoading(true);

    try {
      await dispatch(createPost({
        title: selectedTags.join(" "),
        body: caption,
        images: imageFiles,
        game: gameName.trim() || undefined, // Enviar el juego si escribió algo
      })).unwrap();
      
      navigate("/feed");
    } catch (error: any) {
      console.error("Failed to create post:", error);
      alert(error.message || "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/feed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090619] to-[#702A4C] text-white font-['Orkney'] p-6">
      <h1 className="font-['Anurati'] text-3xl text-center mt-6 mb-2">
        CREATE A POST
      </h1>

      <hr className="border-[#6A5ACD]/30 mb-6 w-2/3 mx-auto" />

      {/* Upload y preview */}
      <div className="flex items-start justify-center gap-6 mb-8 overflow-x-auto flex-nowrap">
        <ImageUploadButton onImageSelect={handleImageSelect} />
        
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative flex-shrink-0">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-36 h-36 object-cover rounded-2xl"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm hover:bg-pink-700 transition"
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Campo de juego */}
      <div className="mb-8">
        <p className="flex items-center gap-2 text-[#FF0099] mb-3">
          <span className="material-symbols-outlined text-lg">sports_esports</span> 
          Game (optional)
        </p>
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          placeholder="e.g., Skyrim, GTA V, The Witcher 3..."
          className="w-full p-3 rounded-xl bg-gradient-to-r from-[#702A4C] to-[#090619] text-white placeholder-gray-400 outline-none border border-[#FF0099]/30 focus:border-[#FF0099] transition"
        />
        <p className="text-xs text-gray-400 mt-2">
          Add a game name to help others find your post
        </p>
      </div>
      
      {/* Hashtags */}
      <TagSelector
        tags={tags}
        selectedTags={selectedTags}
        onTagToggle={toggleTag}
      />

      {/* Text area */}
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Say what you think"
        className="w-full p-3 rounded-xl bg-gradient-to-r from-[#702A4C] to-[#090619] text-white placeholder-gray-400 outline-none mb-6"
        rows={4}
      />

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleCancel}
          disabled={loading}
          className="bg-gray-300 text-gray-900 px-8 py-2 rounded-full hover:bg-gray-400 transition disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-gradient-to-r from-[#090619] to-[#702A4C] text-white px-8 py-2 rounded-full hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </button>
      </div>
    </div>
  );
}
