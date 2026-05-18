import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

// Cascading font sizes: compact, fits in a small strip — like original Ali Sanati design
const CASCADE_SIZES = [
  { fontSize: "clamp(14px, 1.45vw, 22px)", fontFamily: "Arial, sans-serif" },  // Line 1 — largest
  { fontSize: "clamp(12px, 1.15vw, 18px)", fontFamily: "Arial, sans-serif" },  // Line 2 — medium
  { fontSize: "clamp(10px, 0.9vw,  14px)", fontFamily: "Arial, sans-serif" },  // Line 3 — smallest
];

export const AnimatedTextLines = ({ text, className }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: {
          trigger: containerRef.current,
        },
      });
    }
  });

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => (lineRefs.current[index] = el)}
          className="block tracking-wide text-pretty"
          style={{
            ...(CASCADE_SIZES[index] || CASCADE_SIZES[CASCADE_SIZES.length - 1]),
            lineHeight: 1.3,
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
};
