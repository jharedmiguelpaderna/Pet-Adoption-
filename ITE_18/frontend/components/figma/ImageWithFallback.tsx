'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string | any; // Allow any type for imported images
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/assets/placeholder.png' 
}: ImageWithFallbackProps) {
  const [imageSource, setImageSource] = useState<any>(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSource(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Try to extract string URL from object if possible
      if (typeof src === 'object' && src !== null) {
        if ('src' in src) {
          setImageSource(src.src);
        } else if ('default' in src && typeof src.default === 'string') {
          setImageSource(src.default);
        } else {
          setImageSource(fallbackSrc);
        }
      } else {
        setImageSource(fallbackSrc);
      }
    }
  };

  // If src is empty or null, immediately use fallback image
  if (!src || (typeof src === 'string' && src.trim() === '')) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        onError={handleError}
      />
    );
  }

  // If error occurred, use fallback
  if (hasError) {
    return (
      <img
        src={typeof imageSource === 'string' ? imageSource : fallbackSrc}
        alt={alt}
        className={className}
        onError={handleError}
      />
    );
  }

  // If src is a string (URL path)
  if (typeof src === 'string') {
    const isDataUrl = src.startsWith('data:');
    const isExternalUrl = src.startsWith('http://') || src.startsWith('https://');
    
    // Use regular img for data URLs and external URLs
    if (isDataUrl || isExternalUrl) {
      return (
        <img
          src={src}
          alt={alt}
          className={className}
          onError={handleError}
        />
      );
    }
    
    // Use Next.js Image for local paths
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        width={500}
        height={500}
        onError={handleError}
        unoptimized
      />
    );
  }

  // If src is an object (Next.js imported image), pass it directly to Next.js Image
  if (src && typeof src === 'object') {
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        width={500}
        height={500}
        onError={handleError}
        unoptimized
      />
    );
  }

  // Fallback
  return (
    <img
      src={fallbackSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
