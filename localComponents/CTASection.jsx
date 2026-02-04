"use client";

import Image from "next/image";
import styles from "./CTASection.module.css";
import { useEffect, useRef } from 'react';  

export default function InfiniteCTA() {


const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add(styles.show);
                }
            });
        },{
            threshold: 0.25
        });

        if(sectionRef.current){
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    })


  const images = [
    "/testimoniale/recenzie1.webp",
    "/testimoniale/testimonial3.webp",
    "/testimoniale/testimonial4.webp",
    "/testimoniale/testimonial2.webp",
    "/testimoniale/testimonial1.webp",
    "/testimoniale/testimonial11.webp",
    "/testimoniale/testimonial13.webp",

  ];

    const images2 = [
    "/testimoniale/testimonial8.webp",
    "/testimoniale/testimonial6.webp",
    "/testimoniale/testimonial7.webp",
    "/testimoniale/testimonial9.webp",
    "/images/nutritie.webp",
    "/testimoniale/testimonial5.webp",
    "/testimoniale/testimonial10.webp",
  ];

  const loopImages = [...images, ...images];
  const loopImages2 = [...images2, ...images2];

  return (
    <div ref={sectionRef} className={styles.wrapper}>

      <h2 className={styles.title}>Nici acum nu te-ai <span>hotărât?</span></h2>

      <div className={styles.scroller}>
        <div className={styles.track}>
          {loopImages.map((src, i) => (
            <div className={styles.imageWrapper} key={`line1-${i}`}>
              <Image className={styles.sliderImg} width={350} height={450} src={src} alt="client" />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scroller}>
        <div className={`${styles.track} ${styles.reverse}`}>
          {loopImages2.map((src, i) => (
            <div className={styles.imageWrapper} key={`line2-${i}`}>
              <Image className={styles.sliderImg} width={350} height={450} src={src} alt="client" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
