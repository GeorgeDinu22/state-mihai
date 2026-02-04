"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import SimpleAreaChart from "./AreaChart";

export default function ContinutAdmin({ data }) {
  const [tranzactii, setTranzactii] = useState([]);
  const [period, setPeriod] = useState("month");

  useEffect(() => {
    setTranzactii(data);
  }, [data]);


  const trazanctiiSuccess = tranzactii.filter(t => t.status === "success");
const tranzactiiFail = tranzactii.filter(t => {
  const statusDinRelatie = Array.isArray(t.tranzactii) 
    ? t.tranzactii[0]?.status_plata 
    : t.tranzactii?.status_plata;

  return (
    t.status === "failed" || 
    t.status_plata === "eșuat" ||
    statusDinRelatie?.toLowerCase() === "failed" ||
    statusDinRelatie === "eșuat" ||
    statusDinRelatie === "requires_payment_method"
  );
});
  const clientiNonContactati = trazanctiiSuccess.filter(t => t.client_contactat === false || t.client_contactat === null);

  let sumaTotal = 0;
  trazanctiiSuccess.forEach(t => {
    sumaTotal += t.produse.pret;
  });

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let sumaLunar = 0;
  trazanctiiSuccess.forEach(t => {
    const d = new Date(t.updated_at);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      sumaLunar += t.produse.pret;
    }
  });

  const productStats = {};
  trazanctiiSuccess.forEach(t => {
    const id = t.produs_id;
    if (!productStats[id]) {
      productStats[id] = {
        count: 0,
        name: t.produse?.titlu || "Pachet Necunoscut"
      };
    }
    productStats[id].count++;
  });

  let bestProductTitle = "Nicio vânzare";
  let maxSales = 0;

  for (const id in productStats) {
    if (productStats[id].count > maxSales) {
      maxSales = productStats[id].count;
      bestProductTitle = productStats[id].name;
    }
  }

  function getDailyRevenue(items, selectedPeriod) {
    const map = {};
    const today = new Date();
    const daysMap = { week: 7, month: 30, "3months": 90, "6months": 180 };
    const days = daysMap[selectedPeriod] ?? 30;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days);

    items.forEach(t => {
      if (t.status !== "success") return;
      const date = new Date(t.updated_at);
      if (date < startDate) return;
      const key = date.toISOString().split("T")[0];
      if (!map[key]) map[key] = 0;
      map[key] += t.produse.pret;
    });

    return Object.entries(map)
      .map(([date, total]) => ({ name: date, "Suma Incasata": total }))
      .sort((a, b) => new Date(a.name) - new Date(b.name));
  }

  const revenueData = getDailyRevenue(tranzactii, period);

  if(tranzactii.length === 0){
    return(<>
      <h2 style={{padding:"40px", margin:"10px 10px 10px 200px"}}>Nu exista date despre tranzactii!</h2>
    </>)
  }
  return (
    <>
      <h1>Bine ai revenit!</h1>
      <div className="containerStats">
        <div className="cardStats">
          Total Comenzi:{" "}
          <strong>
            <CountUp end={trazanctiiSuccess.length} duration={1.5} />
          </strong>
        </div>

        <div className="cardStats">
          Total tranzacții eșuate:{" "}
          <strong>
            <CountUp end={tranzactiiFail.length} duration={1.5} />
          </strong>
        </div>

        <div className="cardStats">
          Suma totală încasată:{" "}
          <strong className="incasari">
            <CountUp end={sumaTotal} duration={1.5} />
          </strong>
          <p>RON</p>
        </div>

        <div className="cardStats">
          Suma încasată luna aceasta:{" "}
          <strong className="incasari">
            <CountUp end={sumaLunar} duration={1.5} />
          </strong>
          <p>RON</p>
        </div>

        <div className="cardStats">
          Cel mai bine vândut pachet:{" "}
          <strong>{bestProductTitle}</strong>
        </div>

        <div className="cardStats">
          Clienți necontactați:{" "}
          <strong>
            <CountUp end={clientiNonContactati.length} duration={1.5} />
          </strong>
        </div>

        <div className="cardStats grafic" style={{ height: 400 }}>
          <p>Grafic încasări</p>
          <div className="periodSelector">
            {["week", "month", "3months", "6months"].map((p) => (
              <button 
                key={p} 
                className={period === p ? "active" : ""} 
                onClick={() => setPeriod(p)}
              >
                {p === "week" ? "7 zile" : p === "month" ? "30 zile" : p === "3months" ? "3 luni" : "6 luni"}
              </button>
            ))}
          </div>
          <SimpleAreaChart data={revenueData} />
        </div>
      </div>
    </>
  );
}