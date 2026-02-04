"use client";

import { useEffect, useRef } from 'react';
import styles from './Testimoniale.module.css';
import Image from 'next/image';

export default function Testimoniale(){
    const Images = ['/testimoniale/testimonial15.webp', '/testimoniale/testimonial6.webp', '/testimoniale/testimonial4.webp', '/testimoniale/testimonial3.webp', '/testimoniale/testimonial2.webp','/testimoniale/testimonial7.webp',];

    const cardRefs = useRef([]);
    const titluRef = useRef(null);

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

        cardRefs.current.forEach(card => {
            if(card) observer.observe(card);
        });

        if(titluRef.current){
            observer.observe(titluRef.current);
        }

        return () => observer.disconnect();
    })

    return(
        <>
        <section className={styles.testimonialeBody}>
            <h3 ref={titluRef} className={styles.titlu}>
                Ce spun cei care au făcut pasul spre <strong>schimbare</strong>
            </h3>
            <div className={styles.containerTestimoniale}>
                
            {Images.map((img,index) => (
                  <div
                    ref={(el) => (cardRefs.current[index] = el)}
                    className={styles.card}
                    key={index}>
                    <Image className={styles.image}
                    width={600}
                    height={600}
                    src={img}
                    sizes='100vw'
                    loading="lazy"
                    unoptimized={true}
                    style={{ width: '100%', height: 'auto' }}
                    alt='Mihai State - Testimoniale'
                    />
                </div>
                ))
            }
              
            </div>
        </section>
        </>
    )
}


 
 
