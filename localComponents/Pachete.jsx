"use client";

import Link from 'next/link';
import styles from './Pachete.module.css';
import * as Icons from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CheckOutModal from '@/localComponents/CheckOutModal/CheckOutModal.jsx';

export default function Pachete({produse}){

    const cardRefs = useRef([]);
    const titluRef = useRef(null);
    const infoRef = useRef(null);

    const [show, setShow] = useState(false);
    const [pachetPressed, setPachetPressed] = useState(null);
    const [pachetInfo, setPachetInfo] = useState(null);

    function HandlePachetClick(produs){
        setShow(true);
        setPachetInfo(produs);
        setPachetPressed(true);
    }

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

        cardRefs.current.forEach(card => {
            if(card) observer.observe(card);
        });

        if(titluRef.current){
            observer.observe(titluRef.current);
        }
        if(infoRef.current){
           observer.observe(infoRef.current);
        }

        return () => observer.disconnect();
    })

  if(Array.isArray(produse) && produse.length > 0){
    return(
        <>
         {pachetPressed && (
      <CheckOutModal
        show={show}
        data={pachetInfo}
        close={() => {
          setShow(false); 

          setTimeout(() => {
            setPachetPressed(false);
          }, 500);
        }}
      />
    )}
       <div id="pachete"></div>
            <section 
            className={styles.bodyPachete}>
                <h3 className={styles.titluSection} ref={titluRef}>
                Alege pachetul potrivit pentru tine
                </h3>
                <div ref={infoRef} className={styles.infoPachete}>
                  Daca nu esti multumit de pachetul cumparat si nu ai rezultate vizibile, poti cere banii inapoi
                  <br/>

                  <div>
                  Citeste 
                  <Link className={styles.link} href="/politica-retur">Politica de Retur</Link>
                  </div>
                 
                </div>
                <div className={styles.containerPachete}>
                    {produse.map((prod) => {
                      const Icon = Icons[prod.icon] || Gem;

                      const includesList = prod.includes
                        ? prod.includes.split("\n").filter(line => line.trim() !== "")
                        : [];
                      
                      const excludedList = prod.exclued 
                        ? prod.exclued.split("\n").filter(line => line.trim() !== "")
                        : [];

                      return(
          <div
            ref={(el) => (cardRefs.current[prod.id] = el)}
            className={styles.card}
            style={{
              "--glow-color": prod.accentColor,
              pointerEvents: prod.isActive ? "auto" : "none",
              overflow: !prod.isActive ? "hidden" : "none",
            }}
            key={prod.id}
          >

        {prod.isBestDeal && (
          <div style={{filter: !prod.isActive ? "grayscale(1)" : "none"}} className={styles.bestValue}>{prod.textBestDeal}</div>
        )}
       

        <div className={prod.isActive ? styles.contentWrapper : `${styles.contentWrapper} ${styles.pachetInactiv}`}>
          
          <div className={styles.iconCard}>
            <Icon
              color={prod.accentColor}
              strokeWidth={1.5}
              size={32}
            />
          </div>

          <p className={styles.titlu}>{prod.titlu}</p>
          <p className={styles.pret}>{prod.pret} RON</p>

          {prod.durata && (
            <p className={styles.durata}>{"Durata: " +  prod.durata}</p>
          )}

          <ul className={styles.includes}>
            <p className={styles.includedTitle}>Include</p>
            {includesList.length > 0 && (
              includesList.map((item, i) => <li key={i}>{item}</li>)
            )}
          </ul>

          <ul className={styles.excludes}>
            <p className={styles.excludedTitle}>Exclude</p>
            {excludedList.length > 0 && (
              excludedList.map((item, i) => <li key={i}>{item}</li>)
            )}
          </ul>

          <div
            onClick={() => HandlePachetClick(prod)}
            className={styles.cta}
          >
            {prod.textBtn}
          </div>
        </div>

        {!prod.isActive && (
          <div className={styles.backgroundInactiv}>
            <p>{prod.textInactiv}</p>
          </div>
        )}
    </div>
                      )
                  })}
                </div>
            </section>
        </>
    )
  }
}