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
            threshold: 0.35
        });

        if(sectionRef.current){
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    })


  const images = [
    "/testimoniale/recenzie1.png",
    "/testimoniale/recenzie2.png",
    "/testimoniale/recenzie3.png",
    "/testimoniale/recenzie4.png",
  ];

  // dublăm imaginile pentru loop perfect
  const loopImages = [...images, ...images];

  return (
    <div ref={sectionRef} className={styles.wrapper}>

      <h2 className={styles.title}>Nici acum nu te-ai hotărât?</h2>

      {/* SCROLLER 1 */}
      <div className={styles.scroller}>
        <div className={styles.track}>
          {loopImages.map((src, i) => (
            <div className={styles.imageWrapper} key={`line1-${i}`}>
              <Image fill src={src} alt="client" />
            </div>
          ))}
        </div>
      </div>

      {/* SCROLLER 2 */}
      <div className={styles.scroller}>
        <div className={`${styles.track} ${styles.reverse}`}>
          {loopImages.map((src, i) => (
            <div className={styles.imageWrapper} key={`line2-${i}`}>
              <Image fill src={src} alt="client" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
