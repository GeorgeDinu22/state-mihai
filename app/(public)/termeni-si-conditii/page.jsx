import Footer from "@/localComponents/Footer";
import "../styles/index.css";

export const metadata = {
  title: "Termeni și condiții | Mihai State",
  description:
    "Termenii și condițiile pentru serviciile de fitness coaching remote: comenzi, plăți, livrare, rambursări, răspundere.",
};

export default function TermeniSiConditii() {
  return (
    <>
    <main className="legalPage">
      <h1>Termeni și condiții</h1>
      <p>Ultima actualizare: 19.01.2026</p>

      <section>
        <h2>1. Părțile contractului</h2>
        <p>
          Prestator (Operator economic): <strong>S.C. NEW SPORT GENERATION S.R.L</strong>, 
          CUI/CIF: <strong>36650195</strong>, 
          sediul social: <strong>București</strong>, 
          e-mail: <a href="mailto:contact@statemihai.ro">contact@statemihai.ro</a>, 
          telefon: <strong>+40 746 113 737</strong>.
          <br />
          Client: persoana fizică sau juridică ce plasează comanda și achită serviciile pe site.
        </p>
      </section>


      <section>
        <h2>2. Obiectul</h2>
        <p>
          Furnizarea de servicii de <strong>coaching fitness online</strong> (plan de antrenament,
          recomandări nutriționale generale cu scop educațional, call-uri/programări online, feedback),
          conform descrierii de pe site și a pachetului selectat.
        </p>

      </section>

      <section>
        <h2>3. Comandă și încheierea contractului</h2>
        <ul>
          <li>Comanda se plasează online pe site, iar contractul se încheie la confirmarea plății.</li>
          <li>Prestatorul poate refuza comanda înainte de începerea serviciului, cu rambursarea integrală.</li>
        </ul>
      </section>

      <section> 
    <h2>4. Prețuri și plăți</h2>
    <ul>
      <li>
        Prețurile afișate pe site sunt exprimate în lei (RON) și{" "}
        <strong>nu includ TVA</strong>, Prestatorul nefiind plătitor de TVA
        conform legislației fiscale în vigoare.
      </li>
      <li>
        Plata se face online, în condiții de siguranță, prin{" "}
        <strong>Stripe</strong>.
      </li>
      <li>
        Prestatorul emite documente fiscale conform legislației aplicabile.
      </li>
    </ul>
      </section>

      <section>
        <h2>5. Livrarea serviciilor</h2>
        <p>
          Livrarea se realizează electronic (e-mail/acces în platformă/call) în
          termenele comunicate după confirmarea plății. Clientul se obligă să
          furnizeze informații corecte și complete necesare personalizării.
        </p>
      </section>

      <section>
        <h2>6. Dreptul de retragere și rambursări</h2>
        <p>
          Serviciile oferite sunt <strong>personalizate</strong>. Cu toate acestea,
          dacă Clientul nu este mulțumit de serviciile achiziționate, poate solicita
          <strong>rambursarea integrală a sumei plătite</strong>, înainte de începerea
          efectivă a prestării sau într-un termen rezonabil comunicat de Prestator.
        </p>
      </section>

      <section>
        <h2>7. Obligațiile clientului</h2>
        <ul>
          <li>Să furnizeze informații reale, complete și actualizate.</li>
          <li>Să respecte planurile și indicațiile primite în mod responsabil.</li>
          <li>Să nu redistribuie materialele (drepturi de autor aparțin Prestatorului).</li>
        </ul>
      </section>

      <section>
        <h2>8. Disclaimer medical</h2>
        <p>
          Serviciile oferite nu substituie consultul medical. Înainte de a începe
          orice program de antrenament sau nutriție, consultă un medic
          specialist. Participarea se face pe propria răspundere.
        </p>
      </section>

    <section>
      <h2>9. Limitarea răspunderii</h2>
      <p>
        Prestatorul nu garantează obținerea unor rezultate specifice și nu este
        răspunzător pentru consecințele rezultate din nerespectarea programelor,
        recomandărilor sau indicațiilor oferite.
      </p>
      <p>
        Răspunderea Prestatorului, în măsura permisă de lege, este limitată la
        valoarea sumei achitate de Client pentru serviciul în cauză și nu afectează
        drepturile legale ale consumatorului.
      </p>
    </section>


      <section>
        <h2>10. Proprietate intelectuală</h2>
        <p>
          Conținutul site-ului și materialele livrate (texte, planuri, imagini,
          video) sunt protejate de drepturi de autor. Este interzisă copierea,
          distribuirea sau revânzarea fără acord scris.
        </p>
      </section>

      <section>
        <h2>11. Forța majoră</h2>
        <p>
          Nicio parte nu răspunde pentru neexecutare cauzată de forță majoră,
          dovedită conform legii.
        </p>
      </section>

      <section>
        <h2>12. Legea aplicabilă și soluționarea litigiilor</h2>
        <p>
          Prezentul document este guvernat de legea română. Litigiile se soluționează
          pe cale amiabilă, iar în lipsa unei înțelegeri, de instanțele competente
          din România.
        </p>
      </section>

    </main>
        <Footer/>
        </>
  );
}
