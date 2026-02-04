import { unstable_cache } from "next/cache";
import { supabaseServer } from "./supabaseServer";

export const getPacheteCached = unstable_cache(
    async() => {
        const supabase = supabaseServer();

         const { data, error } = await supabase
            .from("produse")
            .select("*")
            .eq("is_deleted", false)
            .order('pozitie',{ascending: true});

            if(error){
                throw new Error("A aparut o eroare!");
            }
            return data;
    },
    ['lista-pachete-frontend'],
    {
        revalidate: 86400,
        tags:['pachete']
    }
)