"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";
import "./Counter.css";

function Number({ mv, number, height }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) memo -= 10 * height;
    return memo;
  });

  return (
    <motion.span className="counter-number" style={{ y }}>
      {number}
    </motion.span>
  );
}

function Digit({ place, value, height, digitStyle }) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);
  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className="counter-digit" style={{ height, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places = [100, 10, 1],
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = "white",
  fontWeight = "bold",
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = "black",
  gradientTo = "transparent",
  topGradientStyle,
  bottomGradientStyle,
}) {
  const height = fontSize + padding;
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // 🔹 Detectează când intră în viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // oprește după prima activare
        }
      },
      { threshold: 0.75 } // procent din înălțime necesar pt declanșare
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // 🔹 Pornește animația doar când devine vizibil
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1750; 
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      setDisplayValue(value * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  // 🔹 Stiluri implicite
  const defaultCounterStyle = {
    fontSize,
    gap,
    borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight,
  };

  const defaultTopGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
  };

  const defaultBottomGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
  };

  return (
    <div ref={ref} className="counter-container" style={containerStyle}>
      <div
        className="counter-counter"
        style={{ ...defaultCounterStyle, ...counterStyle }}
      >
        {places.map((place) => (
          <Digit
            key={place}
            place={place}
            value={displayValue}
            height={height}
            digitStyle={digitStyle}
          />
        ))}
      </div>
      <div className="gradient-container">
        <div
          className="top-gradient"
        ></div>
        <div
          className="bottom-gradient"
        ></div>
      </div>
    </div>
  );
}
