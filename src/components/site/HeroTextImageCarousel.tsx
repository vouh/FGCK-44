"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


// Each slide has: heading, tagline, description, image, buttons (array of {text, href})
export const heroSlides = [
  {
    heading: "Welcome to\nFull Gospel Church\nGithurai 44",
    tagline: "Jesus Healing Center",
    description: "We are grateful for your presence and thankful that you are part of our fellowship. Join us every Sunday as we worship together.",
    image: "/images/test.png",
    buttons: [
      { text: "Plan Your Visit →", href: "/new-here" },
      { text: "Watch Sermons", href: "/sermons" }
    ]
  },
  {
    heading: "Get Inspired by Our\nSermons",
    tagline: "Inspiring Messages",
    description: "Listen to powerful sermons and grow in faith with us every week.",
    image: "/images/logo.png",
    buttons: [
      { text: "Browse Sermons", href: "/sermons" },
      { text: "Meet Pastors", href: "/pastors" }
    ]
  },
  {
    heading: "Discover Our\nMinistries",
    tagline: "Find Your Place to Serve",
    description: "Serve, grow, and connect with our church family through our ministries.",
    image: "/images/test.png",
    buttons: [
      { text: "Explore Ministries", href: "/ministries" },
      { text: "Join a Team", href: "/contact" }
    ]
  },
  {
    heading: "Get to Know About\nOur Events",
    tagline: "Be Part of Our Community",
    description: "Join us for special gatherings, outreach, and vibrant community events.",
    image: "/images/logo.png",
    buttons: [
      { text: "Upcoming Events", href: "/events" },
      { text: "Plan Your Visit →", href: "/new-here" }
    ]
  }
];

export default function HeroTextImageCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 7000); // 7 seconds
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

  // Wider on desktop, less top space, more width for text
  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-12 px-0 md:px-8 max-w-[96rem] xl:max-w-[120rem] mx-auto pt-0 lg:pt-2">
      {/* Animated Text with accent line */}
      <div className="flex flex-col justify-center items-start z-10 w-full max-w-4xl px-2 sm:px-8 lg:pl-24 relative">
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
            <HeroSlideText slide={heroSlides[index]} />
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 grid grid-cols-2 gap-2 w-full max-w-xs sm:max-w-md">
          {heroSlides[index].buttons.map((btn, i) => (
            <a
              key={i}
              href={btn.href}
              className={
                i === 0
                  ? "group rounded-lg bg-white px-2 py-2 sm:px-5 sm:py-3 text-[11px] sm:text-xs font-bold text-blue-950 shadow-lg transition-all hover:bg-blue-50 hover:scale-105 hover:shadow-xl text-center"
                  : "rounded-lg border-2 border-white/30 bg-white/10 px-2 py-2 sm:px-5 sm:py-3 text-[11px] sm:text-xs font-bold text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-105 text-center"
              }
            >
              {btn.text}
            </a>
          ))}
        </div>
      </div>
      {/* Animated Image with custom blue border */}
      <div className="flex items-center justify-center relative w-full max-w-3xl h-[32rem] lg:h-[36rem] mt-8 lg:mt-0">
        <div className="relative flex items-center justify-center h-[26rem] w-[26rem] md:h-[32rem] md:w-[32rem] lg:h-[36rem] lg:w-[36rem]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              className="absolute h-full w-full rounded-[2.5rem] overflow-hidden border-8 border-blue-600 shadow-2xl bg-white flex items-center justify-center"
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 120 : -120, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -120 : 120, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
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


// Animated text component for hero slide (heading, tagline, description)
function HeroSlideText({ slide }: { slide: typeof heroSlides[number] }) {
  // Animate each line from a different direction
  // Each letter comes from a random direction for typing effect
  function getRandomDirection() {
    const dirs = [
      { x: -40, y: 0 }, // left
      { x: 40, y: 0 },  // right
      { x: 0, y: -40 }, // top
      { x: 0, y: 40 }   // bottom
    ];
    return dirs[Math.floor(Math.random() * dirs.length)];
  }
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
      {/* Heading: large, bold, blue, with manual line breaks */}
      {slide.heading.split("\n").map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 0, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-300 leading-tight max-w-full"
          style={{ wordBreak: "break-word" }}
        >
          {line.split("").map((char, j) => {
            const dir = getRandomDirection();
            return (
              <motion.span
                key={j}
                variants={{
                  hidden: { opacity: 0, x: dir.x, y: dir.y },
                  visible: { opacity: 1, x: 0, y: 0 }
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </motion.div>
      ))}
      {/* Tagline: italic, white, slightly smaller, above description */}
      {slide.tagline && (
        <motion.div
          initial={{ opacity: 0, x: 0, y: 60 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 0, y: 60 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="mt-6 text-xl italic text-white max-w-full"
        >
          {slide.tagline}
        </motion.div>
      )}
      {/* Description: normal, white */}
      {slide.description && (
        <motion.div
          initial={{ opacity: 0, x: 0, y: -60 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 0, y: -60 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="mt-4 text-lg md:text-xl text-white max-w-full"
        >
          {slide.description}
        </motion.div>
      )}
    </motion.div>
  );
}
