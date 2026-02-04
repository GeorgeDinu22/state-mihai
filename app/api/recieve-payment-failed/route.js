import { sendEmailDirect } from "@/lib/email";
import { getFailEmailTemplate } from "@/lib/email-template-fail";
import { supabaseServer } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req){
    const authHeader = req.headers.get("Authorization");
    if(authHeader !== `Bearer ${process.env.INNER_SYSTEM_BEARER_TOKEN}`)
        return NextResponse.json({error: 'Unathorised!'}, {status:401});

    const {purchaseId, pachetId, clientId, recoveryToken} = await req.json();

    const supabase = await supabaseServer();

    try{
        const {data:purchase, error:pError} = await supabase
            .from("purchases")
            .select("produs_id, client_id, retry_email_sent_at, produse (titlu), clients (numeComplet, email)")
            .eq('id', purchaseId)
            .single();
            
        if(pError){
            throw new Error(`Error is: ${JSON.stringify(pError)}`);
        }
        if(!purchase){
            throw new Error('Data is not found!');
        }
        if(purchase.retry_email_sent_at !== null){
            return NextResponse.json({error:"Acest ID are deja mailul de retry trimis!"})
        }

        const emailTemplate = getFailEmailTemplate(purchase.clients.numeComplet, purchase.produse.titlu, purchase.produs_id, recoveryToken);

        const res = await sendEmailDirect({ 
            to: purchase.clients.email, 
            subject: `[Eroare Plată] Comanda ta pentru ${purchase.produse.titlu} nu s-a finalizat`, 
            html: emailTemplate 
        });

        if(res.success){
            const {error:updateError} = await supabase
                .from("purchases")
                .update({retry_email_sent_at: new Date().toISOString() })
                .eq('id', purchaseId);
        if(updateError){
            console.error("Eroare la update, dar mail-ul a plecat!");
        }

        return NextResponse.json({ success: true, message: "Email si DB | Success" });
        }

        else{
            console.error("Emailul de Retry Payment nu a putut fi trimis. Eroare este ", res.error);
            return NextResponse.json({ error: "Email failed", details: res.error }, { status: 500 });
        }
    }
    catch(error){
            console.error(error);
            return NextResponse.json({error:error.message},{status:500});
    }
}