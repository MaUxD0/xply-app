
interface ImageCarouselProps {
  images: string[];
  altText?: string;
}

export default function ImageCarousel({ images, altText = "Post" }: ImageCarouselProps) {
  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={altText}
        className="w-full h-72 object-cover"
      />
    );
  }

  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${altText} ${idx + 1}`}
          className="w-full h-72 object-cover flex-shrink-0 snap-center"
        />
      ))}
    </div>
  );
}