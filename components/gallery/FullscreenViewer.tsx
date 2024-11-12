"use client";

import React, { useState, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { useHotkeys } from "react-hotkeys-hook";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid,
  Loader2,
} from "lucide-react";

interface ImageData {
  id: number;
  src: string;
  caption?: string;
}

interface FullscreenViewerProps {
  images: ImageData[];
  onClose: () => void;
  initialIndex?: number;
}

export default function Component({
  images,
  onClose,
  initialIndex = 0,
}: FullscreenViewerProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const showNextImage = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setIsLoading(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      resetZoom();
    }
  }, [currentIndex, images.length]);

  const showPreviousImage = useCallback(() => {
    if (currentIndex > 0) {
      setIsLoading(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
      resetZoom();
    }
  }, [currentIndex]);

  const resetZoom = useCallback(() => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.5, 3));
    setIsZoomed(true);
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prevZoom) => {
      const newZoom = Math.max(prevZoom - 0.5, 1);
      if (newZoom === 1) {
        setIsZoomed(false);
      }
      return newZoom;
    });
  }, []);

  const handlePan = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isZoomed && e.buttons === 1) {
        setPanPosition((prevPosition) => ({
          x: prevPosition.x + e.movementX,
          y: prevPosition.y + e.movementY,
        }));
      }
    },
    [isZoomed]
  );

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard navigation
  useHotkeys("left", showPreviousImage);
  useHotkeys("right", showNextImage);
  useHotkeys("esc", onClose);

  // Touch gestures
  const handlers = useSwipeable({
    onSwipedLeft: showNextImage,
    onSwipedRight: showPreviousImage,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const variants = useMemo(
    () => ({
      enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      }),
      center: {
        x: 0,
        opacity: 1,
      },
      exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
      }),
    }),
    []
  );

  // Loading animation variants
  const loadingVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* Top Controls */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
        <motion.button
          onClick={handleZoomIn}
          className="p-2 text-white bg-gray-800/50 rounded-full hover:bg-gray-700/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ZoomIn size={20} />
        </motion.button>
        <motion.button
          onClick={handleZoomOut}
          className="p-2 text-white bg-gray-800/50 rounded-full hover:bg-gray-700/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ZoomOut size={20} />
        </motion.button>
        <motion.button
          onClick={toggleFullscreen}
          className="p-2 text-white bg-gray-800/50 rounded-full hover:bg-gray-700/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Maximize2 size={20} />
        </motion.button>
        <motion.button
          onClick={onClose}
          className="p-2 text-white bg-gray-800/50 rounded-full hover:bg-gray-700/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Main Image Display */}
      <div
        {...handlers}
        className="relative flex items-center justify-center w-full h-full"
        onMouseMove={handlePan}
      >
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={images[currentIndex].id}
            custom={currentIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {/* Loading Spinner */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  variants={loadingVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-10"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <Image
              ref={imageRef}
              src={images[currentIndex].src}
              alt={`Image ${currentIndex + 1} of ${images.length}`}
              fill
              priority
              sizes="100vw"
              className="object-contain"
              style={{
                transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
                transition: isZoomed ? "none" : "transform 0.3s ease-out",
              }}
              onLoadingComplete={() => setIsLoading(false)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <motion.button
            onClick={showPreviousImage}
            className="absolute left-4 p-2 text-white bg-gray-800/50 rounded-full hover:bg-gray-700/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}
        {currentIndex < images.length - 1 && (
          <motion.button
            onClick={showNextImage}
            className="absolute right-4 p-2 text-white bg-gray-800/50 rounded-full hover:bg-gray-700/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        )}
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Thumbnails Toggle */}
      <motion.button
        onClick={() => setShowThumbnails(!showThumbnails)}
        className="absolute bottom-4 right-4 p-2 text-white bg-gray-800/50 rounded-full hover:bg-gray-700/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Grid size={20} />
      </motion.button>

      {/* Thumbnails */}
      <AnimatePresence>
        {showThumbnails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 inset-x-0 flex justify-center items-center gap-2 p-4 bg-black/50 overflow-x-auto"
          >
            {images.map((image, index) => (
              <motion.button
                key={image.id}
                onClick={() => {
                  setIsLoading(true);
                  setCurrentIndex(index);
                }}
                className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                  index === currentIndex ? "ring-2 ring-white" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
