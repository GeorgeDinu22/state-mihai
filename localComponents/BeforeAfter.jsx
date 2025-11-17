import React from "react";
import BeforeAfterSlider from './BeforeAfterSlider.jsx';
import { Weight, Quote, Dumbbell } from 'lucide-react';

import { cn } from "@/lib/utils";

import styles from './BeforeAfter.module.css'
import Image from "next/image.js";

export default function BeforeAfter(){

  const Clienti = [
    {
      nume:"Andrei M.",
      imagineClient: "/logo.png",
      obiectiv: "+4kg",
      iconObiectiv: Dumbbell,
      beforeImage:"/beforeAfter/before1.png",
      afterImage:"/beforeAfter/after1.png",
      recenzie:"Colaborarea cu Mihai mi-a schimbat complet viața. Am slăbit 12 kilograme în 3 luni și, mai important, am învățat cum să-mi mențin rezultatele fără restricții inutile."
    },
    {
      nume:"Andrei M.",
      imagineClient: "/logo.png",
      obiectiv: "-8kg",
      iconObiectiv: Weight,
      beforeImage:"/beforeAfter/before3.png",
      afterImage:"/beforeAfter/after3.png",
      recenzie:"Colaborarea cu Mihai mi-a schimbat complet viața. Am slăbit 8 kilograme în doar o lună și, mai important, am învățat cum să-mi mențin rezultatele fără restricții inutile."
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
      <div className={styles.containerBefore}>

        {Clienti.map((client,index) => (
        <React.Fragment key={index}>
          <div className={styles.cardBefore}>
              <h4 className={styles.titluBefore}>
              <Image className={styles.clientImg}
              width={44}
              height={44}
              alt="Imagine Client"
              src={client.imagineClient}
              />
              {client.nume}
              </h4>
            <div className={styles.obiective}>
              <div className={styles.obiectiv}>
             {client.iconObiectiv && (
                <client.iconObiectiv strokeWidth={1.5} size={24}/>
            )}
                {client.obiectiv}
              </div>
            </div>
            <BeforeAfterSlider className={styles.beforeSlider}
              beforeImage={client.beforeImage}
              afterImage={client.afterImage}
            />
            <p className={styles.recenzie}>
              <Quote color="#009dff"  strokeWidth={1.25}/>
                {client.recenzie}
              <Quote color="#009dff" className={styles.endingQuate} strokeWidth={1.25}/>
            </p>
          </div>
          {index < Clienti.length - 1 && <div className={styles.hrLine} />}
        </React.Fragment>
        ))}


        {/*
        <div className={styles.cardBefore}>
          <h4 className={styles.titluBefore}>
            <Image className={styles.clientImg}
            width={44}
            height={44}
            alt="Imagine Client"
            src="/logo.png"
            />
            Andrei M.
            </h4>
          <div className={styles.obiective}>
            <div className={styles.obiectiv}>
              <Weight strokeWidth={2} />
              -20kg
            </div>
          </div>
          <BeforeAfterSlider className={styles.beforeSlider}
            beforeImage="/beforeAfter/before-faruri.webp"
            afterImage="/beforeAfter/after-faruri.webp"
          />
          <p className={styles.recenzie}>
             <Quote strokeWidth={1}/>
            Colaborarea cu Mihai mi-a schimbat complet viața. Am slăbit 12 kilograme în 3 luni și, mai important, am învățat cum să-mi mențin rezultatele fără restricții inutile.
            <Quote className={styles.endingQuate} strokeWidth={1}/>
          </p>
        </div>
        
       <BeforeAfterSlider className={styles.beforeSlider}
          beforeImage="/beforeAfter/before-faruri.webp"
          afterImage="/beforeAfter/after-faruri.webp"
        />
     <BeforeAfterSlider className={styles.beforeSlider}
          beforeImage="/beforeAfter/before-faruri.webp"
          afterImage="/beforeAfter/after-faruri.webp"
        />
                */}
      </div>
    </div>

        </>
    )
}