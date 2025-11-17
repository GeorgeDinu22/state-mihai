"use client";
import Link from "next/link";
import { useState , useEffect, useRef} from "react";

export default function Header(){

    const [droped, SetDroped] = useState(false);

    const HandleBoxCLick = () =>{
        SetDroped(prev => !prev);
    }

    const headerRef = useRef(null);

  const HandleBoxClick = () => {
    SetDroped(prev => !prev);
  };

  useEffect(() => {
    let Scroll_Initial = window.scrollY;

    const handleScroll = () => {
      let current_Scroll = window.scrollY;

      if (current_Scroll > Scroll_Initial + 4 && current_Scroll > 20) {

        // ascunde headerul
        headerRef.current?.classList.add("invisible");

        // închide meniul
        SetDroped(false);

      } else if (current_Scroll < Scroll_Initial - 4 || current_Scroll <= 20) {
        headerRef.current?.classList.remove("invisible");
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
            <div onClick={() => HandleBoxCLick()} className="box">
                <div className={`line ${droped ? "cross" : ""}`}></div>
                <div className={`line ${droped ? "cross" : ""}`}></div>
                <div className={`line ${droped ? "cross" : ""}`}></div>
            </div>
            <div className={`dropwDown ${droped ? "droped" : ""}`}>
                <Link onClick={() => HandleBoxCLick()} className="linkHeader" href="/">Acasa</Link>
                <Link onClick={() => HandleBoxCLick()} className="linkHeader" href="#despreMine">Despre Mine</Link>
                <Link onClick={() => HandleBoxCLick()} className="linkHeader" href="#rezultate">Rezultate</Link>
                <Link onClick={() => HandleBoxCLick()} className="linkHeader" href="#preturi">Preturi</Link>
                <Link onClick={() => HandleBoxCLick()} className="linkHeader" href="#contact">Contact</Link>
            </div>
        </header>
        </>
    )
}