"use client";
import { useRouter } from "next/navigation"

export default function Button({text, task}){

    const router = useRouter();

    return(
        <>
<div
    onClick={task}
    className="button">
                {text}<span>+</span>
</div>
        </>
    )
   
}