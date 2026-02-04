"use client";

import './checkoutmodal.css'
import { X } from 'lucide-react';
import CheckOutButton from '@/localComponents/CheckOutButton/checkoutBtn';
import { useEffect, useState } from "react";

export default  function CheckOutModal({show, close, data}) {

const [animate, setAnimate] = useState(false);

useEffect(() => {
  if (show) {
    document.body.style.overflow = "hidden";
    setTimeout(() => setAnimate(true), 20); 
  } else {
    setAnimate(false);
    document.body.style.overflow = "auto";
  }
}, [show]);

  

    return (
    <section className={`modalCheckOut ${show ? "visible" : ""}`}>
        <div onClick={close} className="closeModal">
                <X color='black' size={32}/>
            </div>

        <div style={{ "--glow-color": data.accentColor }} className={`checkoutSection ${animate ? "slide" : ""}`}>
            <h4>{data.titlu}</h4>

            <div className='durataContainer'>
                <span className='label'>Durată:</span>
                <span className='key'>{data.durata || "-----"}</span>
            </div>

            <div className='pretPachet'>
                <span className='label'>Preț:</span>
                <span className='key'>{data.pret} RON</span>
            </div>

             <div className='includeContainer'>
                    <p className='label'>Include:</p>
                    <div className="list">
                        {data.includes?.split("\n").map((item, i) => (
                            <span key={i}>{item}</span>
                        ))}
                    </div>
            </div>

        <CheckOutButton
            productRef={data}
        />
            
        </div>
    </section>
    );
}
