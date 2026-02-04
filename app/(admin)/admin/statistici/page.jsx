import { supabaseServer } from "@/lib/supabaseServer";
import PieChartClient from "../components/PieChartClient";
import VerticalLinesChart from "../components/VerticalLinesChart";

export const dynamic = 'force-dynamic';

export default async function Statistici(){
    const supabase = await supabaseServer();

    const {data, error} = await supabase
        .from("purchases")
        .select("status, produse(titlu, accentColor)")
        .eq("status", "success");

    const statsMap = data.reduce((acc, curr) => {
        const titlu = curr.produse.titlu;
        const color = curr.produse.accentColor || "#635BFF"; 

        if (!acc[titlu]) {
            acc[titlu] = { name: titlu, value: 0, fill: color };
        }
        acc[titlu].value += 1;
        return acc;
    }, {});

    const {data: tranzactii, error: tranzactiiError} = await supabase
        .from('tranzactii')
        .select('status_plata');
    
    if (tranzactiiError || !tranzactii) return <div style={{margin:"200px"}}>Eroare la încărcarea tranzacțiilor</div>;

    const succesCount = tranzactii.filter(t => t.status_plata === 'success').length;
    const failedCount = tranzactii.filter(t => t.status_plata === 'failed').length;

    const tranzactiiData = [
        { name: 'Succes', valoare: succesCount, color: '#0cb600ff' },
        { name: 'Eșuate', valoare: failedCount, color: '#ee0000ff' }
    ];

    const chartData = Object.values(statsMap);

    return (
        <div className="containerAdmin">
            <h1>Statistici</h1>
            <div className="containerStatistici">
                <div className="cardStatistici">
                    <h3>Procentaj Pachete Vandute</h3>
                    <p style={{margin:"6px 0 0 0"}}>Total Pachete Vandute: <strong>{data.length}</strong></p>
                    <PieChartClient data={chartData}/>
                </div>
                <div className="cardStatistici">
                    <h3 style={{margin:"-20px 0 0 0"}}>Statistici Tranzactii</h3>
                    <p style={{margin:"6px 0 0 0"}}>Total Tranzactii: <strong>{tranzactii.length}</strong> </p>
                    <VerticalLinesChart data={tranzactiiData}/>
                </div>
            </div> 
        </div>
    );
}