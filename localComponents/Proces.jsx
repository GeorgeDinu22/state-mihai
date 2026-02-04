"use client";

import styles from './Proces.module.css';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Proces(){

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


const Pasi = [
  {
    titlu: "Îți creezi contul în câteva secunde",
    descriere:
      "După achiziționare primești acces în aplicația mea. Îți setezi parola, iar contul este gata, totul simplu, rapid și 100% online.",
    imagine: "/proces/logare.webp",
  },
  {
    titlu: "Primești mesajul de bun venit",
    descriere:
      "Te întâmpin direct în aplicație și îți explic pașii următori. Programul tău este pregătit, iar eu sunt mereu la un mesaj distanță pentru orice întrebare.",
    imagine: "/proces/welcome.webp",
  },
  {
    titlu: "Loghezi mesele și primești feedback",
    descriere:
      "Încarci rapid poze cu mesele tale, iar eu pot urmări și ajusta alimentația în funcție de obiectivele tale.",
    imagine: "/proces/dieta.webp",
  },
  {
    titlu: "Urmezi antrenamentele tale personalizate",
    descriere:
      "Ai acces la planul tău de antrenament, structurat pe zile, cu exerciții video clare și progres adaptat constant nivelului tău.",
    imagine: "/proces/antrenamente.webp",
  },
    {
    titlu: "Îți urmărești progresul zilnic",
    descriere:
      "Pași, somn, greutate, poze cu progresul tău, totul va fi într-un singur loc. Ai o imagine clară asupra evoluției tale, zi de zi.",
    imagine: "/proces/progres.webp",
  }
];

    return(
        <>
        <div className={styles.sectionProcess}>
            <h3 ref={titluRef} className={styles.titlu}>Cum decurge programul?</h3>

            <div className={styles.containerProcess}>
                {Pasi.map((pas,index) => (
                    <div 
                    ref={(el) => (cardRefs.current[index] = el)}
                    key={index}
                     className={styles.cardProcess}>
                        <div className={styles.circle}>
                            {index+1}
                        </div>
                        <h6 className={styles.headingCard}>
                            {pas.titlu}
                        </h6>
                        <p className={styles.description}>
                             {pas.descriere}
                        </p>
                        <div className={styles.containerImage}>
                            <Image
                            width={450}
                            height={150}
                            src={pas.imagine}
                            alt={pas.titlu}/>
                        </div>

                    </div>
                ))}
            </div>
        </div>
        </>
    )
}