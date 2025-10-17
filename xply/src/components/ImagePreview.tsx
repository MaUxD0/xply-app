

interface ImagePreviewProps {
  images: string[];
  onRemove: (url: string) => void;
}

export default function ImagePreview({ images, onRemove }: ImagePreviewProps) {
  if (images.length === 0) return null;

  return (
    <div className="flex gap-4 flex-nowrap overflow-x-auto flex-shrink-0">
      {images.map((img, idx) => (
        <div key={idx} className="relative flex-shrink-0">
          <img
            src={img}
            alt={`Preview ${idx + 1}`}
            className="w-36 h-36 object-cover rounded-2xl"
          />
          <button
            onClick={() => onRemove(img)}
            className="absolute top-2 right-2 bg-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm hover:bg-pink-700 transition"
            aria-label="Remove image"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}