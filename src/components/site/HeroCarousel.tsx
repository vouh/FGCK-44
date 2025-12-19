"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/images/test.png",
  "/images/test.png",
  "/images/test.png"
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto flex max-w-2xl items-center justify-center h-80">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute transition-all duration-700 ${i === index ? 'opacity-100 scale-105 z-20' : 'opacity-0 scale-95 z-10'} h-72 w-72 rounded-3xl overflow-hidden border-4 border-white shadow-xl`}
          style={{ left: '50%', top: '50%', transform: `translate(-50%, -50%) ${i === index ? '' : 'scale(0.95)'}` }}
        >
          <Image src={src} alt={`Church moment ${i + 1}`} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
