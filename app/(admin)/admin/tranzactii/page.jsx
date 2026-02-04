import './tranzactii.css';
import TranzactiiTabel from '../components/TranzactiiTabel';
import { supabaseServer } from "@/lib/supabaseServer";

export default async function Tranzactii() {
    const supabase = await supabaseServer();

    const { data, count } = await supabase
        .from("tranzactii")
        .select(`
            *,
            clients ( numeComplet, email, telefon )
        `, { count: 'exact' })
        .range(0, 9) 
        .order("id", { ascending: false });

    return (
        <TranzactiiTabel initialData={data || []} initialCount={count || 0} />
    );
}