"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import styles from './CtaScroll.module.css'
import TextType from '../components/TextType';
import { useEffect, useRef } from 'react';  

export default function CtaScroll(){


    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add(styles.show);
                }
            });
        },{
            threshold: 0.5
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

    "/testimoniale/recenzie1.png",
    "/testimoniale/recenzie2.png",
     "/testimoniale/recenzie3.png",
    "/testimoniale/recenzie4.png",

     "/testimoniale/recenzie1.png",
    "/testimoniale/recenzie2.png",
     "/testimoniale/recenzie3.png",
    "/testimoniale/recenzie4.png",


     "/testimoniale/recenzie1.png",
    "/testimoniale/recenzie2.png",
     "/testimoniale/recenzie3.png",
    "/testimoniale/recenzie4.png",


     "/testimoniale/recenzie1.png",
    "/testimoniale/recenzie2.png",
     "/testimoniale/recenzie3.png",
    "/testimoniale/recenzie4.png",


      "/testimoniale/recenzie1.png",
    "/testimoniale/recenzie2.png",
     "/testimoniale/recenzie3.png",
    "/testimoniale/recenzie4.png",


     "/testimoniale/recenzie1.png",
    "/testimoniale/recenzie2.png",
     "/testimoniale/recenzie3.png",
    "/testimoniale/recenzie4.png",


      "/testimoniale/recenzie1.png",
    "/testimoniale/recenzie2.png",
     "/testimoniale/recenzie3.png",
    "/testimoniale/recenzie4.png",

     "/testimoniale/recenzie1.png",
    "/testimoniale/recenzie2.png",
     "/testimoniale/recenzie3.png",
    "/testimoniale/recenzie4.png",

     "/testimoniale/recenzie1.png",
    "/testimoniale/recenzie2.png",
     "/testimoniale/recenzie3.png",
    "/testimoniale/recenzie4.png",
    
  ];

     return (
   <div ref={sectionRef} className={styles.container}>
  <div className={styles.textWrapper}>
    <TextType className={styles.textType}
      text={[
        "Transformă-ți corpul",
        "Întărește-ți mintea",
        ""
      ]}
      typingSpeed={75}
      pauseDuration={2000}
      showCursor={true}
      cursorCharacter="|"
    />

    <p className={styles.subtitle}>
      Coaching personal, antrenamente eficiente și o mentalitate puternică —
      tot ce ai nevoie pentru a construi un stil de viață echilibrat și autentic.
    </p>

    <div className={styles.buttons}>
      <button className={styles.primaryBtn}>Începe azi</button>
    </div>
  </div>

  
</div>

  );
}