"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FullscreenViewer from "./FullscreenViewer";
import Image from "next/image";

interface ImageData {
  id: number;
  src: string;
  title?: string;
  width: number;
  height: number;
  subImages?: ImageData[];
}

interface MasonryGalleryProps {
  images: ImageData[];
}

export default function MasonryGalleryMobile({ images }: MasonryGalleryProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [fullscreenParentIndex, setFullscreenParentIndex] = useState<
    number | null
  >(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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
        { threshold: 0.1, rootMargin: "50px" }
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

  const openFullscreen = (index: number) => {
    setFullscreenParentIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenParentIndex(null);
  };

  return (
    <>
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
            <div
              className="relative group overflow-hidden bg-gray-100 cursor-pointer"
              onClick={() => openFullscreen(index)}
            >
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
              {image.title && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-base font-normal text-center capitalize">
                    {image.title}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {fullscreenParentIndex !== null && (
        <FullscreenViewer
          images={images[fullscreenParentIndex].subImages || []}
          onClose={closeFullscreen}
        />
      )}
    </>
  );
}
