import { galleryImages } from "../data/galleryImages";
import { GalleryCard } from "./GalleryCard";

export function GalleryGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "24px",
        marginTop: "32px",
      }}
    >
      {galleryImages.map((image) => (
        <GalleryCard key={image.id} image={image} />
      ))}
    </div>
  );
}