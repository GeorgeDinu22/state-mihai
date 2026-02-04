

import "./success.css";
import { BadgeCheck } from "lucide-react"; // Am adăugat Copy și Check pentru feedback vizual
import AutoClearStorage from "./AutoClearStorage";
import {Stripe} from "stripe";
import { supabaseServer } from "@/lib/supabaseServer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  

export default async function SuccessPage({searchParams}) {

  const params = await searchParams;

  const paymentIntentID = params.payment_intent;
  let paymentData = null;
  let client = [];

  if(paymentIntentID){
    try{
      paymentData = await stripe.paymentIntents.retrieve(paymentIntentID);
      
      if(paymentData){
        const purchaseID = paymentData.metadata.purchase_id;
        const supabase = await supabaseServer();
        const {data: dataClient, error: dataErr} = await supabase
          .from("purchases")
          .select("clients (email)")
          .eq("id", purchaseID)
          .single();

          if(dataClient){
            client = dataClient;
            console.log(client)
          }

          if(dataErr){
            console.log("eroare este ", error)
            throw new Error;
          }
      }
    }
    catch(error){
      return(
    <div className="errorPageWrapper">
      <div className="errorContent">
        <div className="errorIcon">!</div>
        <h2>Ooooops!</h2>
        <p>A apărut o eroare neașteptată.</p>
        <p>
          Reîncarcă pagina, iar dacă eroarea persistă te rugăm să ne{" "}
          <a href="mailto:contact@statemihai.ro" className="errorLink">contactezi</a>!
       </p>
      </div>
    </div>
     )
    }
  }

  const includesList = paymentData.metadata.product_include
                        ? paymentData.metadata.product_include.split("\n").filter(line => line.trim() !== "")
                        : [];

  return (
    <div className="successWrapper">
      <AutoClearStorage />
      <div className="successCard">
        <div className="checkmark">
          <BadgeCheck color="#138fe4" size={75}/>
        </div>

        <h1>Plata a fost reușită!</h1>

        <h2 style={{ width: "90%", margin: "0 auto 20px" }}>
          Tranzacția ta a fost procesată cu succes. Am trimis deja un email 
          cu toate detaliile comenzii și pașii următori la adresa <strong>{client.clients.email}</strong>
        </h2>

        <p>Nu uita să verifici și folderul Spam dacă emailul nu apare în câteva minute</p>

        <div className="hr"></div>

<div className="containerComanda">
  <div className="section-header">

    <h4>Sumar comandă</h4>
  </div>

  <div className="order-card">

    <div className="order-row secondary-row">
      <span className="label">Pachet:</span>
      <span className="value">{paymentData.metadata.product_name}</span>
    </div>

    <div className="order-row secondary-row">
      <span className="label">Durată:</span>
      <span className="value">{paymentData.metadata.product_durata || "-----"}</span>
    </div>

    {includesList.length > 0 && (
      <div className="order-includes-box">
        <p className="includes-label">Beneficii incluse:</p>
        <ul className="includes-list">
          {includesList.map((item, i) => (
            <li key={i}>
             
              {item}
            </li>
          ))}
        </ul>
      </div>
    )}

    <div className="receipt-divider"></div>

    <div className="order-row total-row">
      <span className="total-label">Total achitat</span>
      <span className="total-value">{paymentData.amount / 100} RON</span>
    </div>
  </div>
</div>

        <a href="/" className="btn">
          Înapoi la pagina principală
        </a>
      </div>
    </div>
  );
}