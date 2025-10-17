

interface TagSelectorProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export default function TagSelector({
  tags,
  selectedTags,
  onTagToggle,
}: TagSelectorProps) {
  return (
    <div className="mb-8">
      <p className="flex items-center gap-2 text-[#FF0099] mb-3">
        <span className="material-symbols-outlined text-lg">sell</span> #hashtag
      </p>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
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
  );
}