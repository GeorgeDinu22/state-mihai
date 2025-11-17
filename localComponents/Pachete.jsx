"use client";

import Link from 'next/link';
import styles from './Pachete.module.css';
import { Gem, TrendingUp, Trophy } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core';

export default function Pachete(){

   const iconsMap = {
    Gem: Gem,
    TrendingUp: TrendingUp,
    Trophy: Trophy,
  };

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



const Pachete = [
  {
    id: 1,
    icon:"TrendingUp",
    titlu: "Fitness Basic",
    colorTitlu: "black",
    glowCard: "#00ff99",
    includes: [
      "💪 Plan de antrenament adaptat nivelului tău",
      "🥗 Ghid de nutriție de bază",
      "💬 Suport săptămânal prin WhatsApp",
    ],
    excludes: [
      "🥗 Plan alimentar personalizat",
      "🎥 Feedback pe execuțiile exercițiilor (video)",
      "📹 Check-in video",
      "📊 Monitorizare zilnică a progresului",
      "👥 Acces la comunitatea privată",
    ],
    pret: 500,
  },
  {
    id: 2,
    icon:"Trophy",
    titlu: "Fitness Advanced",
    colorTitlu: "white",
    glowCard: "#4da6ff",
    bestValue: "Best Deal",
    includes: [
      "✨ Tot ce include pachetul Basic",
      "💪 Plan de antrenament 100% personalizat",
      "🥗 Plan alimentar detaliat adaptat obiectivului tău",
      "🎥 Feedback bilunar pe execuții (video check-in)",
      "📲 Acces la platforma de antrenamente",
      "💬 Suport extins prin WhatsApp",
    ],
    excludes: [
      "🧑‍🏫 Antrenor dedicat 1-la-1",
      "📊 Monitorizare zilnică",
      "🔄 Plan actualizat săptămânal",
      "🎟️ Acces VIP la workshop-uri și comunitate privată",
    ],
    pret: 800,
  },
  {
    id: 3,
    icon:"Gem",
    titlu: "Fitness Premium",
    colorTitlu: "black",
    glowCard: "#ffcc00",
    includes: [
      "👑 Tot ce include pachetul Advanced",
      "🧑‍🏫 Antrenor dedicat 1-la-1 (remote)",
      "🔄 Plan adaptat și actualizat săptămânal",
      "📊 Monitorizare zilnică prin aplicație",
      "🎟️ Acces VIP la workshop-uri și comunitate privată",
    ],
    excludes: [
      "🏋️‍♂️ Ședințe fizice în sală (program exclusiv remote)",
    ],
    pret: 1200,
  },
];



    return(
        <>
       
            <section 
            id="preturi"
            className={styles.bodyPachete}>
                <h3 className={styles.titluSection} ref={titluRef}>
                Alege pachetul potrivit pentru tine
                </h3>
                <div className={styles.containerPachete}>
                    {Pachete.map((pachet,index) => {
                      const Icon = iconsMap[pachet.icon] || Gem;

                      return(
                        <div 
                        ref={(el) => (cardRefs.current[index] = el)}
                        className={styles.card} 
                        style={{ "--glow-color": pachet.glowCard }} 
                        key={index}>
                            {pachet.bestValue && (
                            <div className={styles.bestValue}>
                                {pachet.bestValue}
                            </div>
                            )}

                          <div className={styles.iconCard}>
                               <Icon
                                color={pachet.glowCard}
                                strokeWidth={1}
                                size={32}
                               />
                          </div>

                        <p className={styles.titlu}>{pachet.titlu}</p>
                        <p className={styles.pret}>{pachet.pret} RON</p>
                      <ul className={styles.includes}>
                        <p className={styles.includedTitle}>Include</p>
                            {pachet.includes.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>

                        <ul className={styles.excludes}>
                          <p className={styles.excludedTitle}>Exclude</p>
                              {pachet.excludes.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                        </ul>

                        <Link className={styles.cta} href='#'>Incepe Acum</Link>
                    </div>
                      )
                  })}
                </div>
            </section>
        </>
    )
}