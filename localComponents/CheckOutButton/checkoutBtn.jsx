"use client";

import "./button.css";
import { useState } from "react";


export default function CheckOutButton({productRef}){
    const [loading, setLoading] = useState(false);

    const handleCheckoutClick = async () =>{
        setLoading(true);
        window.location.href = `/checkout/${productRef.id}`;
    }
    return (
        <>
        <button className={loading ? "pressed" : ""} onClick={handleCheckoutClick}>
            {loading ? 
                (<span className="loader"></span>) 
                : 
                (<p>Către Plată</p>)
            }
        </button>
        </>
    )
}