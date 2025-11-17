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
    titlu: "Completezi profilul și obiectivele",
    descriere:
      "La înscriere îți setezi obiectivele, istoricul tău, preferințele alimentare și nivelul actual. Astfel pot crea un plan care să se potrivească perfect stilului tău de viață.",
    imagine: "/logo.png",
  },
  {
    titlu: "Primești planul personalizat în aplicație",
    descriere:
      "După analiza datelor tale, îți trimit direct în Sportify programul de antrenament și planul alimentar, adaptate în funcție de obiective și disponibilitate.",
    imagine: "/logo.png",
  },
  {
    titlu: "Urmărești antrenamentele ghidate",
    descriere:
      "Fiecare exercițiu vine cu video, explicații clare și număr de repetări. Totul este urmărit automat în aplicație, astfel încât progresul tău este vizibil zi de zi.",
    imagine: "/logo.png",
  },
  {
    titlu: "Trimite-mi feedback și check-in-uri săptămânale",
    descriere:
      "Îmi trimiți progresul, poze, măsurători și cum te simți. Analizez tot și ajustez planul pentru a te menține motivat și pe direcția corectă.",
    imagine: "/logo.png",
  },
  {
    titlu: "Ajustăm programul continuu",
    descriere:
      "Pe baza evoluției tale, actualizez antrenamentele, caloriile și exercițiile, astfel încât să ai mereu un program eficient și adaptat nevoilor tale.",
    imagine: "/logo.png",
  },
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
                            fill
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