"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// You can change these slides: update image src and text as needed
export const heroSlides = [
  {
    image: "/images/test.png",
    text: "Welcome to Full Gospel Church Githurai 44 — 'Jesus Healing Center'\nWe are grateful for your presence and thankful that you are part of our fellowship. Join us every Sunday as we worship together."
  },
  {
    image: "/images/logo.png",
    text: "Welcome to Our Sermon Room\nExperience inspiring messages and worship with us every week."
  },
  {
    image: "/images/test.png",
    text: "Discover Our Ministries\nFind a place to serve, grow, and connect with our church family."
  },
  {
    image: "/images/logo.png",
    text: "Join Our Events\nBe part of our vibrant community through special gatherings and outreach."
  }
];

export default function HeroTextImageCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => {
      let next = prev + dir;
      if (next < 0) return heroSlides.length - 1;
      if (next >= heroSlides.length) return 0;
      return next;
    });
  };

  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-8 px-0 md:px-8 max-w-[1800px] mx-auto">
      {/* Animated Text with accent line */}
      <div className="flex flex-col justify-center items-start z-10 w-full max-w-2xl px-4 lg:pl-16 relative">
        {/* Accent line connecting to image */}
        <div className="hidden lg:block absolute top-1/2 right-0 w-24 h-2 -translate-y-1/2">
          <svg width="100%" height="100%" viewBox="0 0 96 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4 H90 Q95 4 95 8" stroke="#2563eb" strokeWidth="4" fill="none" />
          </svg>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="w-full"
          >
            <AnimatedHeroText text={heroSlides[index].text} />
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex gap-4 flex-wrap">
          <a href="/new-here" className="group rounded-lg bg-white px-7 py-4 text-sm font-bold text-blue-950 shadow-lg transition-all hover:bg-blue-50 hover:scale-105 hover:shadow-xl">Plan Your Visit →</a>
          <a href="/sermons" className="rounded-lg border-2 border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-105">Watch Sermons</a>
        </div>
      </div>
      {/* Animated Image with custom blue border */}
      <div className="flex items-center justify-center relative w-full max-w-2xl h-[28rem] lg:h-[32rem]">
        <div className="relative flex items-center justify-center h-[22rem] w-[22rem] md:h-[28rem] md:w-[28rem] lg:h-[30rem] lg:w-[30rem]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              className="absolute h-full w-full rounded-[2.5rem] overflow-hidden border-8 border-blue-600 shadow-2xl bg-white flex items-center justify-center"
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ boxShadow: '0 0 0 8px #2563eb33, 0 8px 32px 0 #2563eb22' }}
            >
              <Image src={heroSlides[index].image} alt={`Hero image ${index + 1}`} fill className="object-contain" />
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Arrows */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-8 z-20">
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
    </div>
  );
}

// Animated text component for letter-by-letter effect
function AnimatedHeroText({ text }: { text: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.03 }
        }
      }}
      className="text-left break-words"
    >
      {text.split("\n").map((line, i) => (
        <div
          key={i}
          className={
            i === 0
              ? "text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-xl"
              : "mt-4 text-base sm:text-lg md:text-xl text-blue-200 max-w-xl"
          }
          style={{ wordBreak: "break-word" }}
        >
          {line.split("").map((char, j) => (
            <motion.span
              key={j}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.div>
  );
}
