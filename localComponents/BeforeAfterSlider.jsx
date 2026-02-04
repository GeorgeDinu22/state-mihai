"use client";
import { useRef, useEffect, useState } from "react";
import styles from "./BeforeAfterSlider.module.css";
import { Sparkles } from 'lucide-react';
import Image from "next/image";

export default function BeforeAfterSlider({
  beforeImage = "/before-after/before-faruri.webp",
  afterImage = "/before-after/after-faruri.webp",
}) {
  const containerRef = useRef(null);
  const btnRef = useRef(null);
  const lineRef = useRef(null);
  const afterRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const setSliderPosition = (x) => {
    const rect = containerRef.current.getBoundingClientRect();
    let pos = x - rect.left;
    pos = Math.max(0, Math.min(pos, rect.width));

    let percent = (pos / rect.width) * 100;
    percent = Math.max(4, Math.min(percent, 96));

    afterRef.current.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    btnRef.current.style.left = `${percent}%`;
    lineRef.current.style.left = `${percent}%`;
  };

  const dragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    let x = e.clientX;
    if (e.touches) x = e.touches[0].clientX;
    requestAnimationFrame(() => setSliderPosition(x));
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => dragMove(e);

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener("touchmove", handleMouseMove, { passive: false });

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className={styles.beforeAfterSection}>
      <Image
      width={500}
      height={500}
        src={afterImage}
        className={styles.sliderBefore}
        alt="Imagine înainte de detailing"
      />
      <Image
       width={500}
      height={500}
        ref={afterRef}
        src={beforeImage}
        className={styles.sliderAfter}
        alt="Imagine după detailing"
      />
      <div ref={lineRef} className={styles.sliderLine}></div>
      <div
        ref={btnRef}
        className={styles.sliderButton}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        aria-hidden="true"
      >
       <Sparkles color="#009dff" size={20} strokeWidth={2.25} />
      </div>
    </div>
  );
}
