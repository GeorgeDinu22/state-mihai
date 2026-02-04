import Stripe from "stripe";
import { z } from "zod";
import {redis} from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { isValidPhoneNumber } from 'libphonenumber-js';

const cache = new Map();

const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  ephemeralCache: cache,
  analytics: false,
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const updateIntentSchema = z.object({
  paymentIntentId: z.string().min(1, "ID-ul plății lipsește"),
  customerData: z.object({
    nume_complet: z.string()
      .trim()
      .min(3, "Nume prea scurt")
      .refine((val) => !/[<>{}[\]$/\\]/.test(val), "Caractere nepermise"),
    email: z.string().trim().toLowerCase().email("Email invalid"),
    telefon: z.string()
      .min(1, "Numărul de telefon este obligatoriu")
      .refine((val) => isValidPhoneNumber(val), {
        message: "Numărul de telefon nu este valid!",
      }),
     consimtamant: z.boolean().refine((val) => val === true, {
      message: "Trebuie să accepți termenii și condițiile pentru a continua!",
    }),
  }),
});

export async function POST(req) {

  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const {success} = await rateLimit.limit(`update-intent_${ip}`);
  
  if(!success){
    return Response.json({error: "Momentan sunt prea multe cereri. Te rugăm să încerci din nou în câteva momente."},{ status: 429 });
  }

  try {

    const body = await req.json();

    const result = updateIntentSchema.safeParse(body);

    if(!result.success){
       return Response.json({ error: "Datele introduse nu sunt valide!" }, { status: 400 });
    }

    const { paymentIntentId, customerData } = result.data;

    await stripe.paymentIntents.update(paymentIntentId, {
      receipt_email: customerData.email, 
      description: `Comandă de la ${customerData.nume_complet}`,
      metadata: {
        nume: customerData.nume_complet.trim(),
        email: customerData.email.trim().toLowerCase(),
        telefon: customerData.telefon.trim(),
      }
    });

    return Response.json({ ok: true });

  } catch (error) {
    console.error("Eroare API update-intent:", error);
    return Response.json({ error: "Eroare internă de server" }, { status: 500 });
  }
}