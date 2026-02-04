"use client";

import Link from "next/link";
import './components.css';
import { supabase } from "@/lib/supabaseClient";
import { useRouter, usePathname } from "next/navigation"; 

export default function SideBar(){
    const router = useRouter();
    const pathname = usePathname(); 

    async function logout() {
        await supabase.auth.signOut();
        router.push("/admin/login");
    }

    return(
        <div className="sideBar">
            <h2>Panou Admin</h2>

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

            <div onClick={logout} className="logoutBtn">Log Out</div>
        </div>
    );
}