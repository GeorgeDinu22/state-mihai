import Link from "next/link";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

import styles from './HeroSection.module.css'

export default function HeroSection(){

const images = [
    "/testimoniale/recenzie1.webp",
    "/testimoniale/testimonial5.webp",
    "/testimoniale/testimonial13.webp",
    "/testimoniale/testimonial2.webp",
    
    "/testimoniale/testimonial8.webp",
    "/testimoniale/testimonial1.webp",
    "/images/nutritie.webp",
    "/testimoniale/testimonial4.webp",
    
    "/testimoniale/testimonial10.webp",
    "/testimoniale/recenzie1.webp",
    "/testimoniale/testimonial6.webp",
    "/testimoniale/testimonial11.webp",
    
    "/testimoniale/testimonial3.webp",
    "/testimoniale/testimonial9.webp",
    "/testimoniale/testimonial7.webp",
    "/testimoniale/testimonial14.webp",
    
    "/testimoniale/testimonial2.webp",
    "/testimoniale/testimonial5.webp",
    "/images/rezultat2.webp",
    "/testimoniale/testimonial8.webp",
    
    "/testimoniale/testimonial13.webp",
    "/testimoniale/testimonial4.webp",
    "/testimoniale/recenzie1.webp",
    "/images/rezultat.webp",
    
    "/testimoniale/testimonial6.webp",
    "/testimoniale/testimonial3.webp",
    "/testimoniale/testimonial11.webp",
    "/images/rezultat3.webp",
    
    "/testimoniale/testimonial7.webp",
    "/images/rezultat4.webp",
    "/testimoniale/testimonial14.webp",
    "/testimoniale/testimonial2.webp"
];


    return(
        <>
        <div className={styles.heroBody}>
            

            <div className={styles.heroSection}>
                <h1>
                    Cel mai bun moment pentru a începe să devii mai <span>sănătos</span>, mai <span>puternic</span> și mai bun a fost ieri.
                    <br />
                    Al doilea este astăzi.
                    <br />
                    Cei care eșuează așteaptă ziua de mâine
                </h1>
                <Link className={styles.cta} href="#pachete">Începe transformarea</Link>
            </div>

            <div className={styles.overlay} />
            <ThreeDMarquee className={styles.marquee} images={images} />
        </div>
        
       
        </>
    )
}