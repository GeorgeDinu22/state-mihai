import { supabaseServer } from '@/lib/supabaseServer';
import { Stripe } from 'stripe';
import { sendEmailDirect } from '@/lib/email';
import { getConfirmationEmailHtml } from '@/lib/email-template-success';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    const supabase = await supabaseServer();
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    const pi = event.data.object;
    const metadata = pi.metadata;
    const purchaseId = metadata?.purchase_id;

    if (!purchaseId) {
        console.error("⚠️ Lipsă purchase_id în metadata. PI ID:", pi.id);
        return new Response("Missing purchase_id", { status: 200 }); 
    }

    try {
        switch (event.type) {
            case "payment_intent.succeeded":

            const {data: purchaseData, error: updateError } = await supabase
                    .from("purchases")
                    .update({
                        status: "success",
                        last_payment_intent_id: pi.id,
                        updated_at: new Date().toISOString()
                    })
                    .eq("id", purchaseId)
                    .select()
                    .single();

                if (updateError) {
                    console.error("❌ Eroare Update Purchase status:", updateError);
                    return new Response("Purchase Update Error", { status: 500 });
                }
                    

                const { data: transData, error: transError } = await supabase
                    .from("tranzactii")
                     .upsert({
                        payment_intent_id: pi.id,
                        status_plata: "success",
                        pret: pi.amount,
                        currency: pi.currency,
                        client_id: purchaseData.client_id,
                        produs_id: metadata.product_id,
                        purchase_id: purchaseId,
                        motiv_eroare: null,
                        descriere_eroare: null,
                    }, {
                        onConflict: "payment_intent_id"
                    });

                if (transError) {
                    if (transError.code === '23505') {
                        console.error("ℹ️ Tranzacție duplicată detectată (deja salvată).");
                    } else {
                        console.error("❌ Eroare Insert Tranzactie:", transError);
                    }
                }

                try {
                    const oraPlatii = new Date().toLocaleString("ro-RO", {
                        timeZone: "Europe/Bucharest",
                        hour12: false
                    });

                    const includeList = metadata.product_include
                        ? metadata.product_include.split("\n").map(x => `<div>${x}</div>`).join("")
                        : "";
                    
                    const {data: clientInfo, error: clientErr} = await supabase
                        .from("clients")
                        .select("numeComplet, email, telefon")
                        .eq("id", purchaseData.client_id)
                        .single();

                    const emailHtml = getConfirmationEmailHtml({ metadata, data: transData, idComanda: purchaseId, pi, oraPlatii, includeList, clientInfo });

                    await sendEmailDirect({
                        to: clientInfo.email,
                        subject: "Confirmare Comandă Mihai State",
                        html: emailHtml
                    });
                } catch (err) {
                    console.error("❌ Eroare la trimiterea email-ului catre ",metadata.email, "Eroare: ", err);
                }
                break;



            case "payment_intent.payment_failed":

                const {data: purchaseUpdate, error: failUpdateError } = await supabase
                    .from("purchases")
                    .update({
                        status: "failed",
                        last_failed_at: new Date(),
                        last_payment_intent_id: pi.id,
                    })
                    .eq("id", purchaseId)
                    .select()
                    .single();
                
                if (failUpdateError) console.error("❌ Eroare Update Failed status:", failUpdateError);

                const { data: tranzactieData, error: tranzactieError } = await supabase
                    .from("tranzactii")
                    .upsert({
                        payment_intent_id: pi.id,
                        status_plata: "failed",
                        pret: pi.amount,
                        currency: pi.currency,
                        client_id: purchaseUpdate.client_id,
                        produs_id: metadata.product_id,
                        purchase_id: purchaseId,
                        motiv_eroare: null,
                        descriere_eroare: null,
                    }, {
                        onConflict: "payment_intent_id"
                    });

                if (tranzactieError) {
                    if (tranzactieError.code === '23505') {
                        console.error("ℹ️ Tranzacție duplicată detectată (deja salvată).");
                    } else {
                        console.error("❌ Eroare Insert Tranzactie:", tranzactieError);
                    }
                }
                break;

            default:
        }
    } catch (globalErr) {
        console.error("💥 Eroare neașteptată în Webhook Handler:", globalErr);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response('ok', { status: 200 });
}