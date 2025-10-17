

interface GameCardProps {
  title: string;
  img: string;
  onClick?: () => void;
}

export default function GameCard({ title, img, onClick }: GameCardProps) {
  return (
    <div
      className="flex-shrink-0 w-40 rounded-xl overflow-hidden bg-white/10 border border-white/10 cursor-pointer hover:bg-white/15 transition"
      onClick={onClick}
    >
      <img
        src={img}
        alt={title}
        className="w-full h-44 object-cover"
        loading="lazy"
      />
      <p className="text-sm text-center py-2 text-white">{title}</p>
    </div>
  );
}