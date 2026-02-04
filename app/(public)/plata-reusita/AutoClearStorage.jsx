"use client";
import { useEffect } from 'react';
export default function AutoClearStorage(){
    useEffect(() => {
        localStorage.removeItem("active_checkout_session");
    },[]);
    return null;
}