"use client";

import Link from "next/link";
import './components.css';
import { supabase } from "@/lib/supabaseClient";
import { useRouter, usePathname } from "next/navigation"; 
import { useEffect, useState } from "react";


export default function DropDown(){
    const router = useRouter();
    const pathname = usePathname(); 

    async function logout() {
        await supabase.auth.signOut();
        router.push("/admin/login");
    }

     const [droped, SetDroped] = useState(false);
    
    const HandleBoxCLick = () =>{
        SetDroped(prev => !prev);
    }

    useEffect(() =>{
        SetDroped(false);
    },[pathname]);

    return(
        <>
        <div className="headerAdmin">
            <h3>Panou Admin</h3>

            <div onClick={() => HandleBoxCLick()} className="box">
                <div className={`line ${droped ? "cross" : ""}`}></div>
                <div className={`line ${droped ? "cross" : ""}`}></div>
                <div className={`line ${droped ? "cross" : ""}`}></div>
            </div>

            <div className={`dropDown ${droped ? "droped" : ""}`}>
               <ul>
                <li>
                    <Link 
                        className={`link ${pathname === "/admin" ? "selectedPath" : ""}`} 
                        href="/admin"
                    >
                        Acasa
                    </Link>
                </li>
                 <li>
                    <Link 
                        className={`link ${pathname === "/admin/tranzactii" ? "selectedPath" : ""}`} 
                        href="/admin/tranzactii"
                    >
                        Tranzactii
                    </Link>
                </li>
                 <li>
                    <Link 
                        className={`link ${pathname === "/admin/comenzi" ? "selectedPath" : ""}`} 
                        href="/admin/comenzi"
                    >
                        Comenzi
                    </Link>
                </li>
                 <li>
                    <Link 
                        className={`link ${pathname === "/admin/statistici" ? "selectedPath" : ""}`} 
                        href="/admin/statistici"
                    >
                        Statistici
                    </Link>
                </li>
                 <li>
                    <Link 
                        className={`link ${pathname === "/admin/pachete" ? "selectedPath" : ""}`} 
                        href="/admin/pachete"
                    >
                        Pachete
                    </Link>
                </li>
            </ul>
            <div onClick={logout} className="logoutBtnDropDown">Log Out</div>
            </div>
        </div>
        </>
    )
}