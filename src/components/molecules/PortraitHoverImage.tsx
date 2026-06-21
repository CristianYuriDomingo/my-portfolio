'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface PortraitHoverImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function PortraitHoverImage({
  src,
  alt,
  className = '',
  sizes,
  priority = true,
}: PortraitHoverImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Load the image into an offscreen canvas once, so we can read pixel alpha later
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx?.drawImage(img, 0, 0);
      canvasRef.current = canvas;
      setImgLoaded(true);
    };
  }, [src]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgLoaded || !canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const rect = container.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Map container coords -> natural image coords, accounting for "object-contain" letterboxing
    const containerRatio = rect.width / rect.height;
    const imageRatio = canvas.width / canvas.height;

    let renderWidth: number;
    let renderHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (containerRatio > imageRatio) {
      renderHeight = rect.height;
      renderWidth = renderHeight * imageRatio;
      offsetX = (rect.width - renderWidth) / 2;
      offsetY = 0;
    } else {
      renderWidth = rect.width;
      renderHeight = renderWidth / imageRatio;
      offsetX = 0;
      offsetY = (rect.height - renderHeight) / 2;
    }

    const relX = mouseX - offsetX;
    const relY = mouseY - offsetY;

    if (relX < 0 || relY < 0 || relX > renderWidth || relY > renderHeight) {
      setIsHovering(false);
      return;
    }

    const px = Math.floor((relX / renderWidth) * canvas.width);
    const py = Math.floor((relY / renderHeight) * canvas.height);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const pixel = ctx?.getImageData(px, py, 1, 1).data;
    const alpha = pixel ? pixel[3] : 0;

    setIsHovering(alpha > 30);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full h-full"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`${className} transition-[filter] duration-500 ease-in-out ${
          isHovering ? 'grayscale-0' : 'grayscale'
        }`}
      />
    </div>
  );
}
