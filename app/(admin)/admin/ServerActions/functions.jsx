"use server";
import { supabaseServer } from '../../../../lib/supabaseServer';
import {revalidateTag, revalidatePath } from "next/cache";
import { createServerClient } from '@supabase/ssr';
import { cookies, headers } from 'next/headers';

import { Ratelimit } from "@upstash/ratelimit";
import {redis} from "@/lib/redis";

const cache = new Map();

const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(20, "60 s"),
  ephemeralCache: cache,
  analytics: false,
});

//ADMIN CHECK
async function validateAdmin() {
  try {
    const cookieStore = await cookies(); 
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error("Supabase Auth Error:", error.message);
        throw new Error("Eroare autentificare");
    }

    console.log("USER ESTE:", user?.email, "ROLE:", user?.app_metadata?.role);

    if (!user || user.app_metadata?.role !== 'admin') {
      throw new Error("Acces neautorizat! Trebuie să fii administrator.");
    }
    
    return user;
  } catch (e) {
    console.error("Eroare în validateAdmin:", e.message);
    throw e; 
  }
}

export async function saveProduct(formData){

  try {
    await validateAdmin();
  } catch (error) {
        return { ok: false, message: "Neautorizat"};
  }

  const supabase = supabaseServer();
    
  const titlu = formData.get("titlu");
  const pret = Number(formData.get("pret"));
  const durata = formData.get("durata");
  const icon = formData.get("icon");
  const includes = formData.get("include");
  const exclued = formData.get("exclude");
  const accentColor = formData.get("accent_color");
  const isBestDeal = formData.get("isBestDeal") === "on" ? true : false;
  const textBestDeal = formData.get("text_banner");
  const textBtn = formData.get("textBtn");

  const isActive = formData.get("pachet_activ");
  const textInactiv = formData.get("text_inactiv");

  const {error} = await supabase
        .from("produse")
        .insert([{
            titlu,
            accentColor,
            includes,
            exclued,
            pret,
            durata,
            isBestDeal,
            textBestDeal,
            textBtn,
            icon,
            isActive,
            textInactiv
    }]);
    
      if (error) {
    return { ok: false, message: error.message };
  }

  revalidateTag('pachete', 'max');
  revalidatePath('/admin/pachete');

  return { ok: true };
}

export async function editProduct(formData){

    try {
    await validateAdmin();
  } catch (error) {
        return { ok: false, message: "Neautorizat"};
  }

  const supabase = supabaseServer();

  const id = Number(formData.get('idProdus'));
  const titlu = formData.get("titlu");
  const pret = Number(formData.get("pret"));
  const durata = formData.get("durata");
  const icon = formData.get("icon");
  const includes = formData.get("include");
  const exclued = formData.get("exclude");
  const accentColor = formData.get("accent_color");
  const isBestDeal = formData.get("isBestDeal") === "on" ? true : false;
  const textBestDeal = formData.get("text_banner");
  const textBtn = formData.get("textBtn");

  const isActive = formData.get("pachet_activ");
  const textInactiv = formData.get("text_inactiv");

  const {error} = await supabase 
        .from("produse")
        .update({
            titlu,
            accentColor,
            includes,
            exclued,
            pret,
            durata,
            isBestDeal,
            textBestDeal,
            textBtn,
            icon,
            isActive,
            textInactiv
        })
        .eq('id',id);

        if(error){
          return{ok:false, message: error.message}
        }
        

  revalidateTag('pachete', 'max');
  revalidatePath('/admin/pachete');

  return{ok:true};
}

export async function deleteProduct(id) {

    try {
    await validateAdmin();
  } catch (error) {
        return { ok: false, message: "Neautorizat"};
  }

  const supabase = supabaseServer();

  const {error} = await supabase
      .from("produse")
      .update({
        "is_deleted": true
      })
      .eq('id', id);

    if(error){
      return {ok: false, message: error.message}
    }

  revalidateTag('pachete', 'max');
  revalidatePath('/admin/pachete');

  return{ ok: true};
}

export async function getTranzactii(filters = {}) {

    try {
    await validateAdmin();
  } catch (error) {
        return [];
  }

  const supabase = supabaseServer();

  const {data, error} = await supabase
      .from("tranzactii")
        .select("*")
        .order('id',{ascending: false})
      
      if(error){
            return [];
      }
      return data;
}

export async function setClientContacted(formData){

  try {
    await validateAdmin();
  } catch (error) {
        return { ok: false, message: "Neautorizat"};
  }

    const id = formData.get("idAchizitie");
    const observatii_client_contactat = formData.get("observatiiAchizitie");

    const supabase = await supabaseServer();

    const {error} = await supabase
        .from("purchases")
        .update({
          client_contactat: true,
          observatii_client_contactat,
          data_contact_client: new Date().toISOString()
        })
        .eq("id", id);

      if(error){
        return {ok:false, message: error.message};
      }

      revalidatePath("/admin/comenzi");
      return {ok: true};
}

export async function SetOrdinePachete(order){

  try {
    await validateAdmin();
  } catch (error) {
        return { ok: false, message: "Neautorizat"};
  }

  const supabase = await supabaseServer();

    for (const item of order){
      const {id, pozitie} = item;

       const { error } = await supabase
    .from("produse")
    .upsert(order, { onConflict: 'id' });
      
      if(error){
        return {ok:false, message: error.message};
      }
    }

  revalidatePath('/admin/pachete/')
  revalidateTag('pachete', 'max');
  return {ok: true};
}

export async function filtreazaTranzactii(filters, page = 1) {
  
  const headerList = await headers()
  const ip = headerList.get("x-forwarded-for") ?? "127.0.0.1";
  const {success} = await rateLimit.limit(`filter-tranzactii_${ip}`);
  
  if(!success){
     return { data: [], count: 0, error: "Prea multe cereri!" };
  }

  try {
    await validateAdmin();
  } catch (error) {
    return { data: [], count: 0 };
  }

  const supabase = await supabaseServer();
  const itemsPerPage = 10; 
  
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("tranzactii")
    .select(`
        *,
        clients ( numeComplet, email, telefon )
    `, { count: 'exact' }) 
    .order("id", { ascending: false });

  if (filters.id_stripe && filters.id_stripe.trim() !== '') {
    query = query.ilike('payment_intent_id', `%${filters.id_stripe}%`);
  }
  
  if (filters.status && filters.status !== "toate") {
    query = query.eq('status_plata', filters.status);
  }

  if (filters.email && filters.email.trim() !== '') {
     query = query.not('clients', 'is', null).filter('clients.email', 'ilike', `%${filters.email}%`);
  }

  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error("Eroare filtrare:", error);
    return { data: [], count: 0 };
  }

  return { data, count };
}

export async function getAchizitiiSuccess(filters, page = 1) {

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "127.0.0.1";
  const {success} = await rateLimit.limit(`get-achiztii${ip}`);
  
  if(!success){
     return { data: [], count: 0, error: "Prea multe cereri!" };
  }

  try {
    await validateAdmin();
  } catch (error) {
    return { data: [], count: 0 };
  }

  const supabase = await supabaseServer();
  const itemsPerPage = 10; // Sau 5, cum preferi
  
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  // Construim query-ul
  let query = supabase
    .from("purchases")
    .select(`
        *,
        clients ( numeComplet, email, telefon ),
        produse ( titlu, pret, durata )
    `, { count: 'exact' })
    .eq('status', 'success')
    .order("created_at", { ascending: false });

  
  if (filters.email && filters.email.trim() !== '') {
     query = query.not('clients', 'is', null).filter('clients.email', 'ilike', `%${filters.email}%`);
  }

  if (filters.id && filters.id.trim() !== '') {
    query = query.eq('id', filters.id);
  }

  if (filters.idStripe && filters.idStripe.trim() !== '') {
    query = query.eq('last_payment_intent_id', filters.idStripe);
  }

  // Paginare
  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error("Eroare achizitii:", error);
    return { data: [], count: 0 };
  }

  return { data, count };
}