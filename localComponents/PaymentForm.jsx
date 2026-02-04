"use client";

import { useStripe, useElements, PaymentElement, ExpressCheckoutElement } from "@stripe/react-stripe-js";
import { useRef, useState } from "react";
import './PaymentForm.css';
import Link from "next/link";
import { ArrowBigLeft } from 'lucide-react';
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from "zod";

const paymentSchema = z.object({
  email: z.string()
    .min(1, "Emailul este obligatoriu")
    .trim()
    .toLowerCase()
    .email("Adresa de email nu este validă."),
  nume_complet: z.string()
    .min(3, "Introduceți un nume complet valid.")
    .refine((val) => !/[<>{}[\]$/\\]/.test(val), {
      message: "Numele conține caractere nepermise.",
    }),
  consimtamant: z.preprocess((val) => !!val, z.boolean().refine((val) => val === true, {
    message: "Trebuie să accepți termenii și condițiile pentru a continua!",
  })),
  telefon: z.string()
    .min(1, "Numărul de telefon este obligatoriu!")
    .refine((val) => isValidPhoneNumber(val), {
      message: "Numărul de telefon nu este valid pentru țara selectată.",
    })
});

export default function PaymentForm({ product, form, setForm, clientSecret, purchaseId }) {
  const stripe = useStripe();
  const elements = useElements();
  const btnRef = useRef(null);

  const numeRef = useRef(null);
  const emailRef = useRef(null);
  const telefonRef = useRef(null);
  const consimtamandRef = useRef(null);

  // Am pus false explicit in loc de null, e mai safe
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [stripeError, setStripeError] = useState("");

  const validateFields = () => {
    const result = paymentSchema.safeParse(form);

    if (!result.success) {
      const newErrors = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setErrors(newErrors);

      if (newErrors.nume_complet) numeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      else if (newErrors.email) emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      else if (newErrors.telefon) telefonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      else if (newErrors.consimtamant) consimtamandRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      return null;
    }

    setErrors({});
    return result.data;
  };

  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    // AICI E LOGICA CORECTĂ:
    // Apelăm o singură dată. Dacă e null, oprim. Dacă e obiect, continuăm.
    const validatedData = validateFields();
    
    if (!validatedData) {
      return;
    }

    setLoading(true);
    setStripeError("");

    if (btnRef.current) {
      btnRef.current.style.pointerEvents = "none";
      btnRef.current.style.opacity = '0.75';
    }

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/save-client-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchaseID: purchaseId,
          customerData: validatedData
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "A apărut o eroare la salvarea datelor.");
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/plata-reusita`,
          receipt_email: data.email_client,
          payment_method_data: {
            billing_details: {
              name: data.nume_client,
              email: data.email_client,
              phone: data.telefon_client,
            },
          },
        },
      });

      if (error) {
        throw error;
      }

    } catch (err) {
      setLoading(false);
      setStripeError(err.message || "A apărut o eroare la procesarea plății.");

      if (btnRef.current) {
        btnRef.current.style.pointerEvents = "auto";
        btnRef.current.style.opacity = '1';
      }
    }
  }; 

  const handleExpressClick = ({ resolve, reject }) => {
    if (!validateFields()) {
        reject();
        return;
    }
    resolve();
  };

  return (
    <form onSubmit={handleSubmit} className="paymentForm">

      {/* Date personale */}
      <div className="containerInformatiiPersonale">
        <h4>Date Client</h4>

        <div className="formWrapper">
          <label>Nume Complet</label>
          <input ref={numeRef}
            placeholder="ex: State Mihai"
            value={form.nume_complet}
            onChange={(e) =>
              setForm({ ...form, nume_complet: e.target.value })
            }
            type="text" name='nume_complet' />
          {errors.nume_complet && <p className="error">{errors.nume_complet}</p>}
        </div>

        <div className="formWrapper">
          <label>Email</label>
          <input ref={emailRef} type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            placeholder="ex: example@mail.com"
            name='email' />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="formWrapper" ref={telefonRef}>
          <label>Telefon</label>
          <PhoneInput
            countryCallingCodeEditable={false}
            international
            withCountryCallingCode
            value={form.telefon}
            onChange={(value) => setForm({ ...form, telefon: value || "" })
            }
            defaultCountry="RO"
            placeholder="Introdu numărul"
            className="telefonInput"
          />
          {errors.telefon && <p className="error">{errors.telefon}</p>}
        </div>
      </div>

      <hr className="divider" />

      <div className="containerInfoCard">
        <h4>Plată Card</h4>
        <PaymentElement />
      </div>

      <p className="paymentDivider">SAU</p>

      <div style={{ margin: "0 0 0px 0" }} className="containerExpressCheckout">
        <h4>Plată Rapidă</h4>
        <ExpressCheckoutElement
          onClick={handleExpressClick}
          onConfirm={handleSubmit}
        />
      </div>

      <hr className="divider" />

      <div className="disclaimer">
        <div className="containerDisclaimer">
          <input ref={consimtamandRef} checked={form.consimtamant || false} onChange={(e) => setForm({ ...form, consimtamant: e.target.checked })} id="consimtamantCheckbox" type="checkbox" className="checkBox" name="consimtamant" />
          <label className="label" htmlFor="consimtamantCheckbox">
            Declar că am luat la cunoștință și sunt de acord cu prevederile menționate în{" "}
            <Link target="_black" className="link" href="/termeni-si-conditii">Termenii și Condițiile,</Link>{" "}
            <Link target="_black" className="link" href="/politica-de-confidentialitate">Politica de Confidențialitate</Link>{" "}
            și{" "}
            <Link target="_black" className="link" href="/politica-bani-inapoi">Politica de Bani Înapoi</Link>.
          </label>
        </div>

        {errors.consimtamant && <p className="error">{errors.consimtamant}</p>}
      </div>

      {stripeError && (<div className="stripeError">
        <p>{stripeError}</p>
      </div>)}

      <Link className="backBtn" href="/#preturi">
        <ArrowBigLeft />
        Inapoi
      </Link>

      <button ref={btnRef} type="submit" className="payBtn" disabled={loading}>
        {loading ? (
          <span className="loader"></span>
        ) :
          (
            `Comandă și Plătește Acum ${product.pret} RON`
          )
        }
      </button>
    </form>
  );
}