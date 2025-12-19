import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface ScrollFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollFadeIn({ children, className = "", delay = 0 }: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay },
      });
    }
  }, [inView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
