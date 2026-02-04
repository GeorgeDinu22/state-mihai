
import { supabaseServer } from '@/lib/supabaseServer';
import {redis} from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { z } from "zod";

const cache = new Map();

const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  ephemeralCache: cache,
  analytics: false,
});

const createPurchaseSchema = z.object({
  produsId: z.number().min(1, "ID-ul produsului este obligatoriu"),
});

export async function POST(req) {
  
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const {success} = await rateLimit.limit(`create-purchase_${ip}`);
  
  if(!success){
    return Response.json({error: "rate-limit", message:"Prea multe cereri!"},{ status: 429 });
  }

  try {
    const body = await req.json();

    const result = createPurchaseSchema.safeParse(body);
    if (!result.success) {
      return Response.json({ error: "Datele nu sunt valide!" }, { status: 400 });
    }

    const { produsId } = result.data;

    const supabase = await supabaseServer();

    const { data, error } = await supabase
      .from("purchases")
      .insert({ 
        produs_id: produsId,
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }

    return Response.json({ purchaseId: data.id });
  } catch (err) {
    return new Response("Invalid JSON", { status: 400 });
  }
}