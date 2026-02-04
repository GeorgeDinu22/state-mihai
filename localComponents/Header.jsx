"use client";
import Link from "next/link";
import { TrendingUp } from 'lucide-react';
import { useState , useEffect, useRef} from "react";

export default function Header(){

    const [droped, SetDroped] = useState(false);

    const HandleBoxCLick = () =>{
        SetDroped(prev => !prev);
    }

    const headerRef = useRef(null);

  useEffect(() => {
    let Scroll_Initial = window.scrollY;

    const handleScroll = () => {
      let current_Scroll = window.scrollY;

      if (current_Scroll > Scroll_Initial + 4 && current_Scroll > 20) {

        // ascunde headerul
        headerRef.current?.classList.add("headerHidden");

        // închide meniul
        SetDroped(false);

      } else if (current_Scroll < Scroll_Initial - 4 || current_Scroll <= 20) {
        headerRef.current?.classList.remove("headerHidden");
      }

      Scroll_Initial = current_Scroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

    
    return(
        <>
        <header ref={headerRef}>
            <Link className="logo" href="/">
            Mihai State
            </Link>
            <div className="orizontalNavigation">
                <Link  className="linkHeaderHor" href="/">Acasă</Link>
                <Link  className="linkHeaderHor" href="#despreMine">Despre Mine</Link>
                <Link  className="linkHeaderHor" href="#rezultate">Rezultate</Link>
                <Link  className="linkHeaderHor" href="#pachete">Pachete</Link>
                <Link  className="linkHeaderHor" href="#contact">Contact</Link>
            </div>
            <div onClick={() => HandleBoxCLick()} className="box">
                <div className={`line ${droped ? "cross" : ""}`}></div>
                <div className={`line ${droped ? "cross" : ""}`}></div>
                <div className={`line ${droped ? "cross" : ""}`}></div>
            </div>
            <div className={`dropwDown ${droped ? "droped" : ""}`}>
                <Link onClick={() => HandleBoxCLick()} className="linkHeader" href="/">Acasă</Link>
                <Link onClick={() => HandleBoxCLick()} className="linkHeader" href="#despreMine">Despre Mine</Link>
                <Link onClick={() => HandleBoxCLick()} className="linkHeader" href="#rezultate">Rezultate</Link>
                <Link onClick={() => HandleBoxCLick()} className="linkHeader" href="#pachete">Pachete</Link>
                <Link onClick={() => HandleBoxCLick()} className="linkHeader" href="#contact">Contact</Link>
            </div>
            <div className="headerCta">
              <Link  href="#pachete">
              Începe Acum
              </Link>
              <TrendingUp strokeWidth={3} size={24}/>
            </div>
        </header>
        </>
    )
}