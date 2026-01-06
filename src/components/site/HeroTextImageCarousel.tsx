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
    image: "https://images.unsplash.com/photo-1438032009581-05ea18774e10?auto=format&fit=crop&q=80&w=2000",
    buttons: [
      { text: "Service Times", href: "/about#service-times" },
      { text: "Watch Sermons", href: "/sermons" }
    ]
  },
  {
    heading: "Get Inspired by Our\nSermons",
    tagline: "Inspiring Messages",
    description: "Listen to powerful sermons and grow in faith with us every week.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=2000",
    buttons: [
      { text: "Browse Sermons", href: "/sermons" },
      { text: "Meet Pastors", href: "/pastors" }
    ]
  },
  {
    heading: "Discover Our\nMinistries",
    tagline: "Find Your Place to Serve",
    description: "Serve, grow, and connect with our church family through our ministries.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=2000",
    buttons: [
      { text: "Explore Ministries", href: "/ministries" },
      { text: "Join a Team", href: "/contact" }
    ]
  },
  {
    heading: "Get to Know About\nOur Events",
    tagline: "Be Part of Our Community",
    description: "Join us for special gatherings, outreach, and vibrant community events.",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=2000",
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
      setIndex((i: number) => (i + 1) % heroSlides.length);
    }, 7000); // 7 seconds
    return () => clearInterval(interval);
  }, []);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev: number) => {
      let next = prev + dir;
      if (next < 0) return heroSlides.length - 1;
      if (next >= heroSlides.length) return 0;
      return next;
    });
  };

  return (
    <div className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Full hero background carousel */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[index].image}
            alt="FGCK hero background"
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/85 via-blue-950/70 to-blue-950/85" />

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10 px-4 sm:px-8 max-w-[96rem] xl:max-w-[120rem] mx-auto pt-8 sm:pt-10 lg:pt-16 pb-28 sm:pb-24 lg:pb-16">
        {/* Text */}
        <div className="w-full max-w-4xl lg:pl-16">
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

          <div className="mt-6 mb-16 sm:mb-20 lg:mb-0 grid grid-cols-2 gap-2 w-full max-w-xs sm:max-w-md">
            {heroSlides[index].buttons.map((btn, i) => (
              <a
                key={i}
                href={btn.href}
                className={
                  i === 0
                    ? "group rounded-lg bg-white px-3 py-2.5 sm:px-5 sm:py-3 text-xs font-bold text-blue-950 shadow-lg transition-all hover:bg-blue-50 hover:scale-105 hover:shadow-xl text-center"
                    : "rounded-lg border-2 border-white/30 bg-white/10 px-3 py-2.5 sm:px-5 sm:py-3 text-xs font-bold text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-105 text-center"
                }
              >
                {btn.text}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop: big borderless image accent */}
        <div className="hidden lg:flex items-center justify-center relative w-full max-w-3xl">
          <div className="relative h-[28rem] w-[28rem] xl:h-[32rem] xl:w-[32rem]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl bg-black/10"
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 140 : -140, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction > 0 ? -140 : 140, scale: 0.98 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Image src={heroSlides[index].image} alt={`Hero image ${index + 1}`} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 0px" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/35 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Arrows */}
        <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex gap-6 z-20">
          <button
            aria-label="Previous image"
            onClick={() => paginate(-1)}
            className="rounded-full bg-white/90 p-3 text-blue-950 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            aria-label="Next image"
            onClick={() => paginate(1)}
            className="rounded-full bg-white/90 p-3 text-blue-950 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
  // All letters and lines fade in from below for a unified effect
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.05 }
        }
      }}
      className="text-left break-words"
    >
      {/* Heading: large, bold, blue, with manual line breaks */}
      {slide.heading.split("\n").map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-300 leading-tight max-w-full"
          style={{ wordBreak: "break-word" }}
        >
          {line.split("").map((char, j) => (
            <motion.span
              key={j}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 500, damping: 30, delay: j * 0.04 + i * 0.15 }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      ))}
      {/* Tagline: italic, white, slightly smaller, above description, with typing effect */}
      {slide.tagline && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.03 } }
          }}
          className="mt-6 text-xl italic text-white max-w-full"
        >
          {slide.tagline.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.3 + i * 0.03 }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      )}
      {/* Description: normal, white, with typing effect */}
      {slide.description && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.02 } }
          }}
          className="mt-4 text-lg md:text-xl text-white max-w-full"
        >
          {slide.description.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.45 + i * 0.02 }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}