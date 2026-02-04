import { supabaseServer } from "@/lib/supabaseServer";
import '../tranzactii/tranzactii.css';
import AchizitiiTabel from "../components/AchizitiiTabel";

export const dynamic = 'force-dynamic';

export default async function PageAchizitii() {
    const supabase = await supabaseServer();

    const { data, count } = await supabase
        .from("purchases")
        .select(`
            *,
            clients ( numeComplet, email, telefon ),
            produse ( titlu, pret, includes, durata )
        `, { count: 'exact' })
        .eq('status', 'success') 
        .range(0, 9) 
        .order("created_at", { ascending: false });

    return (
        <AchizitiiTabel initialData={data || []} initialCount={count || 0} />
    );
}