import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createPost } from "../slices/postsSlice";
import ImageUploadButton from "../components/ImageUploadButton";
import ImagePreview from "../components/ImagePreview";
import TagSelector from "../components/TagSelector";

export default function CreatePost() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const tags = ["#gameplay", "#skyrim", "#challenge", "#adventure", "#rpg"];

  const handleImageSelect = (files: FileList) => {
    const readFile = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    Promise.all(Array.from(files).map(readFile))
      .then((dataUrls) => setImages((prev) => [...prev, ...dataUrls]))
      .catch((err) => {

        console.error('Failed to read image files', err);
        alert('Failed to read image files. Please try again.');
      });
  };

  const handleRemoveImage = (url: string) => {
    setImages(images.filter((img) => img !== url));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleUpload = async () => {
    // Validación
    if (images.length === 0) {
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
      // Creamos el post con la acción async
      await dispatch(createPost({
        title: selectedTags.join(" "),
        body: caption,
        images,
        userId: user.id,
        username: user.username,
        avatar: user.avatar,
      })).unwrap();
      
      // Navegamos al feed
      navigate("/feed");
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/feed");
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

