import { Lock, CircleAlert } from 'lucide-react';
import { supabaseServer } from '@/lib/supabaseServer';
import CheckOutClient from '@/localComponents/CheckOutClient/CheckOutClient';

export default async function CheckoutPage({params, searchParams}){

    let formFilled = {
        nume_complet:"",
        email:"",
        telefon:""
    }

    const paramsAwait = await params;

    const id = Number(paramsAwait.id);

    const tokenSearchParams = await searchParams;

    const tokenClient = tokenSearchParams.tokenclient;

    const supabase = await supabaseServer();

    const {data: product, error} = await supabase
        .from("produse")
        .select('id, titlu, pret, includes, durata')
        .eq('id',id)
        .eq('is_deleted',false)
        .eq('isActive', true)
        .single();

    if(tokenClient){
        const {data: clientInfo, error: clientError} = await supabase
            .from("retry_payment_tokens")
            .select("client_id, clients (numeComplet, email, telefon)")
            .eq("token",tokenClient)
            .eq("used", false)
            .gt('expires_at', new Date().toISOString())
            .single();            
        
        if(clientInfo && !clientError){
            formFilled = {
                nume_complet: clientInfo.clients.numeComplet,
                email: clientInfo.clients.email,
                telefon: clientInfo.clients.telefon
            }
        }
    }

    if(!product){
        return(
    <div className="containerCheckOut error-state">
            <div className="error-card">
                <div className="error-icon">
                   <CircleAlert size={64} color='red'/>
                </div>
                <h2>Produsul nu a fost găsit</h2>
                <p>Link-ul accesat este invalid sau produsul nu mai face parte din oferta noastră.</p>
                <a href="/" className="btn-back">Înapoi la pagina principală</a>
            </div>
        </div>
        )
    }
    if(error){
         return(
        <div className="containerCheckOut error-state">
                <div className="error-card">
                    <div className="error-icon">
                    <CircleAlert size={64} color='red'/>
                    </div>
                    <h2>A apărut o eroare!</h2>
                    <p>Te rugăm reîncarcă pagina, iar dacă eroarea persistă ne poți contacta la adresa:<strong> contact@mihaistate.ro</strong></p>
                    <a href="/" className="btn-back">Înapoi la magazin</a>
                </div>
            </div>
        )
    }

                        
    return(
        <>
        <div className="containerCheckOut">
            <div className='titleContainer'>
                <h1>Finalizare Comandă</h1>
                <div className='subTitile'>
                    <Lock color='#635BFF' strokeWidth={2.25}/>
                    <h3>Plată securizată prin <span>Stripe</span></h3>
                </div>
            </div>

        <CheckOutClient formPreFilled={formFilled} product={product}/>

    </div>

        </>
    )
}