import { supabaseServer } from "@/lib/supabaseServer";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import { z } from "zod";
import {redis} from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";

const cache = new Map();

const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  ephemeralCache: cache,
  analytics: false,
});

const createIntentSchema = z.object({
  product: z.object({
    id: z.number({
      required_error: "ID-ul este obligatoriu",
      invalid_type_error: "ID-ul trebuie să fie un număr",
    }).int("ID-ul trebuie să fie un număr întreg") 
      .positive("ID-ul trebuie să fie un număr pozitiv"),
  }),
  purchaseId: z.string().uuid("ID achiziție invalid!"),
});

export async function POST(req) {

  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const {success} = await rateLimit.limit(`create-intent_${ip}`);
  
  if(!success){
    return Response.json({error: "rate-limit", message:"Prea multe cereri!"},{ status: 429 });
  }

  const supabase = supabaseServer();
  
  try {

    const body = await req.json();

    const result = createIntentSchema.safeParse(body);
    if(!result.success){
      return Response.json({ error: "Date invalide!" }, { status: 400 });
    }

    const {product, purchaseId} = result.data;

    const {data, error} = await supabase
      .from("produse")
      .select("id, titlu, includes, durata, pret")
      .eq('id', product.id)
      .single();
    
      if(error){
        return new Response("Date incorecte!", { status: 400 });
      }

      if(data){
            const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(data.pret * 100),
      currency: "ron",
      automatic_payment_methods: { enabled: true },
      setup_future_usage: "off_session", 
      metadata: {
        product_id: data.id,
        purchase_id: purchaseId,
        product_name: data.titlu,
        product_include: data.includes,
        product_durata: data.durata || ""
      },
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    });
      }
  } catch (err) {
    console.log("EROARE Stripe:", err);
    return new Response("Eroare server", { status: 500 });
  }
}
