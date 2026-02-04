"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../PaymentForm.jsx";
import "./CheckOutClient.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckOutClient({ product, formPreFilled }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [purchaseId, setPurchaseId] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
      nume_complet: formPreFilled?.nume_complet || "",
      email: formPreFilled?.email || "",
      telefon: formPreFilled?.telefon || "",
    });
  

useEffect(() => {
  if (!product?.id) return;

  async function initPurchase() {
    const savedSession = localStorage.getItem("active_checkout_session");
    let session = null;

    if (savedSession) {
      try {
        session = JSON.parse(savedSession);
      } catch (e) {
          setError("error");
      }
    }

    if (session && session.produsId === product.id && session.purchaseId) {
     
      setPurchaseId(session.purchaseId);
    } 
    else {
      
      try {
        const res = await fetch("/api/create-purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ produsId: product.id }),
        });

        if (!res.ok) {
          setError(res.error || "A apărut o eroare la inițializarea plății.");
          return;
        }

        const data = await res.json();

        if (data.purchaseId) {
          const newSession = {
            produsId: product.id,
            purchaseId: data.purchaseId
          };
          
          localStorage.setItem("active_checkout_session", JSON.stringify(newSession));
          setPurchaseId(data.purchaseId);
        }
      } catch (err) {
        setError("error");
      }
    }
  }

  initPurchase();
}, [product.id]);

useEffect(() => {
  if (!purchaseId) return;

  async function createIntent() {
    try {
      const res = await fetch("/api/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          purchaseId,
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          setError("Primim prea multe cereri în acest moment.\nTe rugăm să aștepți câteva clipe și să reîncarci pagina!");
        } else {
          setError("A apărut o eroare la inițializarea plății.");
        }
        return; 
      }

      const data = await res.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error("Client secret lipsește din răspuns");
      }
    } catch (err) {
      console.error("Eroare createIntent:", err);
      setError("error");
    }
  }

  createIntent();
}, [purchaseId, product]);

if(error){
    return (
  <div style={{
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: 'rgba(127, 29, 29, 0.2)', 
    border: '1px solid rgb(185, 28, 28)',
    color: 'rgb(252, 165, 165)', 
    textAlign: 'center',
    margin: '10px auto',
    fontFamily: 'sans-serif',
    width:'100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxWidth:"500px",
    marginTop: '150px', 
    transform: 'translate(-50%, -50%)',
  }}>
    <h2 style={{ 
      margin: '0 0 10px 0', 
      fontSize: '1.25rem', 
      fontWeight: '600',
      color: '#ef4444' 
    }}>
      Ceva nu a mers bine
    </h2>
    <p style={{ margin: 0,whiteSpace: 'pre-line', fontSize: '0.95rem', lineHeight: '1.5' }}>
      {error}
    </p>
  </div>
);
  }


  if (!clientSecret) {
    return (
    <div className="loaderContainerCheckout">
      <span className="loaderCheckout"></span>
    </div>
    )
  }
      const includesList = product.includes
                        ? product.includes.split("\n").filter(line => line.trim() !== "")
                        : [];

  return (
    <>
                <div className="containerComanda">
                <h4>Sumar Comandă</h4>
                    <div className="order-card">
                        <div className="order-main">
                            <div className="order-title">Pachet:</div>
                            <div className="order-price">{product.titlu}</div>
                        </div>

                         <div className="order-main">
                            <div className="order-title">Durată:</div>
                            <div className="order-price">{product.durata || "-----"}</div>
                        </div>

                        {includesList.length > 0 && (
                            <div className="order-includes">
                            <p className="includes-label">Beneficii incluse:</p>
                            <ul>
                                {includesList.map((item, i) => (
                                <li key={i}>{item}</li>
                                ))}
                            </ul>
                            </div>
                        )}

                        <div className="order-total">
                            <span>Total</span>
                            <span>{product.pret} RON</span>
                        </div>
                    </div>
            </div>

        <hr className="dividerMain"/>
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: { colorPrimary: "#635BFF" },
        },
      }}
    >
      <PaymentForm
        product={product}
        form={form}
        setForm={setForm}
        purchaseId={purchaseId}
        clientSecret={clientSecret}
      />
    </Elements>
      </>
  );
}
