// components/ProtectedImage.tsx
import Image, { ImageProps } from "next/image";
import { CSSProperties } from "react";

interface ProtectedImageProps extends Omit<ImageProps, "style"> {
  wrapperStyle?: CSSProperties;
}

const ProtectedImage = ({ wrapperStyle, ...props }: ProtectedImageProps) => {
  return (
    <div
      style={wrapperStyle}
      onContextMenu={(e) => e.preventDefault()}
      className="relative"
    >
      <div
        className="absolute inset-0 z-10"
        onDragStart={(e) => e.preventDefault()}
      />
      <Image {...props} draggable={false} />
    </div>
  );
};

export default ProtectedImage;
