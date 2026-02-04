

import { supabaseServer } from "@/lib/supabaseServer";
import AdminGuard from "./AdminGuard";
import './dashboard.css';
import ContinutAdmin from "./components/ContinutAdmin";

export default async function AdminIndexPage() {

  const supabase = await supabaseServer();

  const {data, error} = await supabase
      .from('purchases')
      .select('updated_at, client_contactat, produs_id, status, produse (titlu, pret), tranzactii (status_plata)');
  return(
    <div className="containerAdmin">
       <ContinutAdmin data={data || []}/>
    </div>
  ) 
}