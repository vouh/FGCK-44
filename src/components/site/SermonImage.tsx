"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { getYoutubeThumbnail } from "@/lib/youtube";

interface SermonImageProps extends Omit<ImageProps, "src"> {
  youtubeUrl?: string | null;
  imageUrl?: string | null;
  title: string;
}

export function SermonImage({ youtubeUrl, imageUrl, title, ...props }: SermonImageProps) {
  const maxRes = getYoutubeThumbnail(youtubeUrl, "maxresdefault");
  const hqRes = getYoutubeThumbnail(youtubeUrl, "hqdefault");
  
  const [imgSrc, setImgSrc] = useState<string>(imageUrl || maxRes || hqRes || "/images/placeholder-sermon.svg");
  const [hasError, setHasError] = useState(false);

  // Update image source if props change
  useEffect(() => {
    setImgSrc(imageUrl || maxRes || hqRes || "/images/placeholder-sermon.svg");
    setHasError(false);
  }, [imageUrl, maxRes, hqRes]);

  const handleError = () => {
    if (hasError) return; // Prevent infinite loop

    if (imgSrc === imageUrl && (maxRes || hqRes)) {
      setImgSrc(maxRes || hqRes || "/images/placeholder-sermon.svg");
    } else if (imgSrc === maxRes && hqRes) {
      setImgSrc(hqRes);
    } else {
      setImgSrc("/images/placeholder-sermon.svg");
      setHasError(true);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={title}
      onError={handleError}
      unoptimized={!!youtubeUrl && !imageUrl} // Don't optimize YouTube URLs to save on Vercel image optimization limits
    />
  );
}
