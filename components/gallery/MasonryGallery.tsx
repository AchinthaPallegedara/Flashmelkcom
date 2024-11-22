"use client";
//correct
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

export default function MasonryGalleryDesktop({ images }: MasonryGalleryProps) {
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

  // Calculate rows based on image dimensions
  const calculateRows = () => {
    const rows: ImageData[][] = [[], [], [], []]; // 4 rows by default
    images.forEach((image, index) => {
      const rowIndex = index % rows.length;
      rows[rowIndex].push(image);
    });
    return rows;
  };

  const rows = calculateRows();

  return (
    <>
      <div className="pb-4">
        <div className="md:inline-flex max-md:flex-col space-x-4 min-w-full">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col space-y-4">
              {row.map((image, index) => {
                const globalIndex = rowIndex + index * rows.length;
                return (
                  <motion.div
                    key={image.id}
                    ref={(el) => {
                      observerRefs.current[globalIndex] = el;
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={
                      visibleItems.has(globalIndex) ? { opacity: 1, x: 0 } : {}
                    }
                    transition={{
                      duration: 0.5,
                      delay: (globalIndex % 3) * 0.1,
                      ease: "easeOut",
                    }}
                    className="w-full"
                  >
                    <div
                      className="relative group overflow-hidden bg-gray-100 cursor-pointer"
                      onClick={() => openFullscreen(globalIndex)}
                    >
                      <Image
                        src={image.src}
                        alt={`Gallery image ${image.id}`}
                        width={image.width}
                        height={image.height}
                        className={`w-full h-auto transform transition-transform duration-300 group-hover:scale-105 ${
                          loadedImages.has(globalIndex)
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                        onLoad={() => handleImageLoad(globalIndex)}
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
                );
              })}
            </div>
          ))}
        </div>
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
