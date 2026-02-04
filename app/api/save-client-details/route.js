import { supabaseServer } from "@/lib/supabaseServer";
import {z} from "zod"
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

const clientInfoSchema = z.object({
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
  purchaseID: z.string().uuid("ID achiziție invalid!"),
});

export async function POST(req){

    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const {success} = await rateLimit.limit(`save-client-details_${ip}`);

    if(!success){
        return Response.json(
          {error: "Momentan sunt prea multe cereri. Te rugăm să încerci din nou în câteva momente."},
          { status: 429 }
        );
    }

    const supabase = await supabaseServer();

    try{
    
    const body = await req.json();

    const validateData = clientInfoSchema.safeParse(body);
     if(!validateData.success){
         return Response.json({ error: "Datele introduse nu sunt valide!" },
                              { status: 400 }
                            );
    }

    const {customerData, purchaseID} = validateData.data;

    const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .upsert(
            { numeComplet: customerData.nume_complet, email: customerData.email, telefon: customerData.telefon },
            { onConflict: "email" }
        )
        .select().single();

      if (!clientData) {
        throw new Error("Clientul nu a fost creat");
      }

        if(clientData){
            const {data: purchaseRes, error: purchaseErr} = await supabase
                .from("purchases")
                .update({
                    client_id: clientData.id
                })
                .eq('id', purchaseID);
                
            if(purchaseErr){
                throw purchaseErr;
            }
        }
    if (clientError) throw clientError;

    return new Response(
    JSON.stringify({
                  success: true ,
                  email_client: clientData.email,
                  nume_client: clientData.numeComplet,
                  telefon_client: clientData.telefon
      }
    ),
      {status: 201});
    
} catch (err) {
    console.error("❌ Eroare Upsert Client:", err);
    return new Response("Client Error", { status: 500 });
}

}