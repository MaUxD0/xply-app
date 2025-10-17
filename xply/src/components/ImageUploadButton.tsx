

interface ImageUploadButtonProps {
  onImageSelect: (files: FileList) => void;
  text?: string;
}

export default function ImageUploadButton({
  onImageSelect,
  text = "Upload a photo",
}: ImageUploadButtonProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(files);
    }
  };

  return (
    <label className="flex flex-col items-center justify-center w-36 h-36 border-2 border-dashed border-[#FF0099]/40 rounded-2xl cursor-pointer hover:bg-white/5 transition flex-shrink-0">
      <span className="material-symbols-outlined text-[#FF0099] text-4xl mb-2">
        add_a_photo
      </span>
      <p className="text-sm text-gray-300">{text}</p>
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </label>
  );
}