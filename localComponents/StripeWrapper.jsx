"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripeWrapper({ children, product }) {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/create-intent", {
        method: "POST",
        body: JSON.stringify({product}),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
    })();
  }, [product]);

  if (!clientSecret) return <p>Loading...</p>;

  return (
    <Elements
  stripe={stripePromise}
  options={{
    clientSecret,
    appearance: {
      theme: "night",
      variables: {
        colorPrimary: "#635BFF",
        colorBackground: "#0F0F10",
        colorText: "#FFFFFF",
        colorTextSecondary: "#B3B3B3",
        colorDanger: "#FF4D4D",
        borderRadius: "12px",
        spacingUnit: "6px",
        fontFamily: "Inter, system-ui, sans-serif",
      },
      rules: {
        ".Input": {
          backgroundColor: "#1A1A1D",
          border: "1px solid #2A2A2D",
          padding: "14px",
          color: "#FFFFFF",
        },
        ".Input::placeholder": {
          color: "#6F6F73",
        },
        ".Input:focus": {
          borderColor: "#635BFF",
          boxShadow: "0 0 0 2px rgba(99, 91, 255, 0.4)",
        },
        ".Label": {
          color: "#D0D0D5",
          fontSize: "14px",
          marginBottom: "6px",
        },
        ".Tab": {
          backgroundColor: "#1A1A1D",
          border: "1px solid #2A2A2D",
        },
        ".Tab:hover": {
          borderColor: "#635BFF",
        },
        ".Tab--selected": {
          backgroundColor: "#17171A",
          borderColor: "#635BFF",
        },
      },
    },
  }}
>
  {children}
</Elements>
  );
}
