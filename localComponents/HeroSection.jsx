import Link from "next/link";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

import styles from './HeroSection.module.css'

export default function HeroSection(){

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


    return(
        <>
        <div className={styles.heroBody}>
            

            <div className={styles.heroSection}>
                <h1>Coaching de <span>performanță</span> pentru corp și minte</h1>
                <p>Coaching personalizat 1-1 pentru performanță, disciplină și echilibru.
                </p>
                <Link className={styles.cta} href="mihaistate-abonare.ro">Începe transformarea</Link>
            </div>

            <div className={styles.overlay} />
            <ThreeDMarquee className={styles.marquee} images={images} />
        </div>
        
       
        </>
    )
}