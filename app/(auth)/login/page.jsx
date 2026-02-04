"use client";
import { Eye, EyeOff } from 'lucide-react';

import './styles.css';
import { useState } from "react"

import { supabase } from "@/lib/supabaseClient"; 

export default function Login(){

    const [showPassw, setShowPass] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const email = e.target.email_admin.value;
    const parola = e.target.parola_admin.value;
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: parola
    });

    if (error) {
        setErrorMsg('Date de conectare invalide!');
        setLoading(false);
        return;
    }

    setLoading(false);
    
    const params = new URLSearchParams(window.location.search);
    const nextPath = params.get('next') || "/admin";

    window.location.replace(nextPath);
}
    
    return(
        <>
        <h4>Logare Administrator</h4>
        <form onSubmit={handleLogin}>
            <div className="formWrapper">
                <label>Email</label>
                <input type="email" name="email_admin" placeholder="email@mail.ro"/>
            </div>

             <div className="formWrapper">
                <label>Parola</label>
                <div className="inputWrapper">
                    <input type={showPassw ? "text" : "password"} name="parola_admin" placeholder="Parola123"/>
                    <div onClick={() => setShowPass(!showPassw)} className="showBtn">
                        {showPassw ? <Eye /> : <EyeOff/>}
                    </div>
                </div>
            </div>

        {errorMsg && <p className='error'>{errorMsg}</p>}

            <input id='submitBTN' type="submit" name='submit' value={loading ? "Se loghează..." : "Logare"}/>
        </form>
        </>
    )
}