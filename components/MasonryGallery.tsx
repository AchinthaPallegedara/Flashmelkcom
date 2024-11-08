"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ImageData {
  id: number;
  title: string;
  src: string;
  width: number;
  height: number;
}

interface MasonryGalleryProps {
  images: ImageData[];
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images }) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const observer = useRef<IntersectionObserver | null>(null);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only create the observer once, and reuse it for each image
    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = observerRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (entry.isIntersecting && index !== -1) {
              setVisibleItems((prev) => new Set(prev).add(index));
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );
    }

    observerRefs.current.forEach((ref) => {
      if (ref) observer.current?.observe(ref);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [images.length]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          ref={(el) => {
            observerRefs.current[index] = el;
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={visibleItems.has(index) ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: (index % 3) * 0.1,
            ease: "easeOut",
          }}
          className="break-inside-avoid"
        >
          <div className="relative group  overflow-hidden bg-gray-100">
            {!loadedImages.has(index) && (
              <motion.div
                className="absolute inset-0 bg-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            )}
            <Image
              src={image.src}
              alt={`Gallery image ${image.id}`}
              width={image.width}
              height={image.height}
              className={`w-full h-auto transform transition-transform duration-300 group-hover:scale-105 ${
                loadedImages.has(index) ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => handleImageLoad(index)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 hover:cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="px-4 py-2  text-white  text-xl font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {image.title}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MasonryGallery;
