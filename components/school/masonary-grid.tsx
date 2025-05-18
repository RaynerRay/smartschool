"use client";
import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryCategory, GalleryImageDTO } from "@/types/types";
import Image from "next/image";

// Define props interface for the component
interface ImageGalleryProps {
  galleryCategories: GalleryCategory[];
  galleryImages: GalleryImageDTO[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  galleryImages,
  galleryCategories,
}) => {
  const [images] = useState<GalleryImageDTO[]>(galleryImages);
  const [filteredImages, setFilteredImages] =
    useState<GalleryImageDTO[]>(galleryImages);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>({
    id: "all",
    name: "All",
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Handle filter change
  const handleFilterChange = (category: GalleryCategory): void => {
    setSelectedCategory(category);
    if (category.id === "all") {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((img) => img.categoryId === category.id));
    }
  };

  // Open modal with selected image
  const openModal = (index: number): void => {
    setCurrentImageIndex(index);
    setModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  // Close modal - wrapped in useCallback
  const closeModal = useCallback((): void => {
    setModalOpen(false);
    // Restore scrolling
    document.body.style.overflow = "auto";
  }, []);

  // Navigate to next image - wrapped in useCallback
  const nextImage = useCallback((): void => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [filteredImages.length]);

  // Navigate to previous image - wrapped in useCallback
  const prevImage = useCallback((): void => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  }, [filteredImages.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
      if (!modalOpen) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, nextImage, prevImage, closeModal]);

  // Handle mouse enter for hover effect
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.transform = "scale(1.02)";
  };

  // Handle mouse leave for hover effect
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div className="container mx-auto p-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {[{ id: "all", name: "All" }, ...galleryCategories].map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full ${
              selectedCategory.id === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => handleFilterChange(category)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white"
            style={{
              height: `${Math.floor(Math.random() * 100) + 250}px`,
              transform: "scale(1)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative h-full">
              <Image
                height={500}
                width={500}
                src={image.image || "/placeholder.svg"}
                alt={image.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openModal(index)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                <h3 className="font-semibold text-sm">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Full-size Image View */}
      {modalOpen && filteredImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="max-w-5xl max-h-screen p-4">
            <Image
              width={500}
              height={500}
              src={
                filteredImages[currentImageIndex].image || "/placeholder.svg"
              }
              alt={filteredImages[currentImageIndex].title}
              className="max-w-full max-h-[75vh] object-contain mx-auto"
            />
            <div className="text-center mt-4">
              <h2 className="text-white text-xl font-medium">
                {filteredImages[currentImageIndex].title}
              </h2>
              {filteredImages[currentImageIndex].description && (
                <p className="text-gray-300 mt-2">
                  {filteredImages[currentImageIndex].description}
                </p>
              )}
              {filteredImages[currentImageIndex].date && (
                <p className="text-gray-400 text-sm mt-1">
                  {filteredImages[currentImageIndex].date}
                </p>
              )}
              <p className="text-gray-500 text-sm mt-3">
                {currentImageIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;