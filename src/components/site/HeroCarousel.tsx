"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  "/images/test.png",
  "/images/logo.png",
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => {
      let next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  return (
    <div className="relative mx-auto flex max-w-3xl flex-col items-center justify-center h-[28rem]">
      <div className="relative flex items-center justify-center h-[24rem] w-[24rem]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            className="absolute h-[24rem] w-[24rem] rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white flex items-center justify-center"
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image src={images[index]} alt={`Hero image ${index + 1}`} fill className="object-contain" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center justify-center gap-8">
        <button
          aria-label="Previous image"
          onClick={() => paginate(-1)}
          className="rounded-full bg-blue-100 p-3 text-blue-900 shadow hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          aria-label="Next image"
          onClick={() => paginate(1)}
          className="rounded-full bg-blue-100 p-3 text-blue-900 shadow hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
