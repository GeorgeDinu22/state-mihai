import React from "react";
import BeforeAfterSlider from './BeforeAfterSlider.jsx';
import { Weight, Quote, User } from 'lucide-react';

import { cn } from "@/lib/utils";

import styles from './BeforeAfter.module.css'

export default function BeforeAfter(){

  const Clienti = [
    {
      nume:"Alex",
      imagineClient: "/logo.webp",
      obiectiv: "-27kg",
      iconObiectiv: Weight,
      beforeImage:"/beforeAfter/before5.webp",
      afterImage:"/beforeAfter/after3.webp",
      recenzie:"Salut, Mihai! Mi-a plăcut să lucrez cu tine ca ai reușit să mă motivezi și ca mi-ai explicat totul pe înțelesul meu. M-ai făcut să conștientizez ca nu exista un secret. Trebuie doar sa ai un plan alimentar bine structurat și un să te antrenezi de 3-4 ori pe săptămână. Te-am ascultat și am slăbit 27 kg în aproape 6 luni. Mulțumesc! Pentru mine ești NR. 1!"
    },
    {
      nume:"Laura",
      imagineClient: "/logo.webp",
      obiectiv: "-6kg",
      iconObiectiv: Weight,
      beforeImage:"/beforeAfter/before2.webp",
      afterImage:"/beforeAfter/after2.webp",
      recenzie:"Tot ce voiam să îți spun este că sunt foarte mulțumită de colaborarea cu tine. Chiar simt că a fost una dintre cele mai bune alegeri și investiții pe care le-am făcut. Îmi place mult că spui lucrurile clar și realist, fără promisiuni inutile - așa am înțeles că rezultatele vin doar prin muncă, disciplină și motivație. Fără îndoială am reușit să îmi schimb complet stilul de viață, iar tu m-ai ajutat mult în tot acest proces. De una singură nu aș fi progresat atât. Îți mulțumesc mult!"
    },
  ];

    return(
        <>
    <div id="rezultate" className={styles.beforeBody}>
      <div className={styles.backgroundDots}>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#adadad,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
    </div>
      <h3 className={styles.title}>
        Clients <span>Win</span>
      </h3>
      <p className={styles.descriereBeforeAfter}>Cu disciplină, consecvență și ghidare corectă, rezultate care păreau imposibile au devenit realitate.</p>
      <div className={styles.containerBefore}>

        {Clienti.map((client,index) => (
        <React.Fragment key={index}>
          <div className={styles.cardBefore}>
              <h4 className={styles.titluBefore}>
              <div className={styles.clientCircle}>
              <User size={28}/>
              </div>
              {client.nume}
              </h4>
            <div className={styles.obiective}>
              <div className={styles.obiectiv}>
             {client.iconObiectiv && (
                <client.iconObiectiv strokeWidth={2.5} size={24}/>
            )}
                {client.obiectiv}
              </div>
            </div>
            <BeforeAfterSlider className={styles.beforeSlider}
              beforeImage={client.beforeImage}
              afterImage={client.afterImage}
            />
            <div className={styles.recenzie}>
              <Quote color="#009dff"  strokeWidth={1.25}/>
                <p>{client.recenzie}</p>
              <Quote color="#009dff" className={styles.endingQuate} strokeWidth={1.25}/>
            </div>
          </div>
          {index < Clienti.length - 1 && <div className={styles.hrLine} />}
        </React.Fragment>
        ))}
      </div>
    </div>

        </>
    )
}