import "../styles/index.css";

export const metadata = {
  title: "Termeni și condiții | Mihai State",
  description:
    "Termenii și condițiile pentru serviciile de fitness coaching remote: comenzi, plăți, livrare, rambursări, răspundere.",
};

export default function TermeniSiConditii() {
  return (
    <main className="legalPage">
      <h1>Termeni și condiții</h1>
      <p>Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}</p>

      <section>
        <h2>1. Părțile contractului</h2>
        <p>
          Operator/Prestator: <strong>{/* TODO: Denumire firmă/PFA */} Mihai State PFA</strong>,
          CUI: <strong>{/* TODO */} 12345678</strong>, cu sediul în {/* TODO */} București, România.<br />
          Client: persoana care comandă și achită serviciile pe site.
        </p>
      </section>

      <section>
        <h2>2. Obiectul</h2>
        <p>
          Furnizarea de servicii de <strong>fitness coaching remote</strong> (plan de
          antrenament, plan alimentar, call-uri/programări online, feedback),
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
          <li>Prețurile sunt afișate pe site și pot include TVA, dacă este cazul.</li>
          <li>Plata se face online, securizat, prin <strong>Stripe</strong>.</li>
          <li>Prestatorul emite documentele fiscale conform legii.</li>
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
          Pentru <strong>servicii personalizate</strong>, după începerea prestării (ex. livrarea
          planului inițial), dreptul legal de retragere poate fi limitat conform
          OUG 34/2014. Înainte de începere, poți solicita anularea și rambursarea
          integrală. După începere, se poate oferi o rambursare parțială
          proporțională, la discreția Prestatorului.
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
          Prestatorul nu este răspunzător pentru rezultate garantate sau pentru
          consecințe rezultate din nerespectarea programelor și indicațiilor.
          Răspunderea totală este limitată la valoarea sumei plătite pentru
          serviciul în cauză, în măsura permisă de lege.
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

      <section>
        <h2>13. Contact</h2>
        <p>
          {/** TODO: actualizează datele */}
          E-mail: <a href="mailto:contact@mihaistate.ro">contact@mihaistate.ro</a><br />
          Telefon: {/* TODO */} 07xx xxx xxx
        </p>
      </section>
    </main>
  );
}
