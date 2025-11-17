import "../styles/index.css";


export const metadata = {
  title: "Politica de confidențialitate (GDPR) | Mihai State",
  description:
    "Politica de confidențialitate pentru servicii de fitness coaching remote. Află ce date colectăm, de ce, cât timp și care sunt drepturile tale.",
};

export default function PoliticaDeConfidentialitate() {
  return (
    <main className="legalPage">
      <h1>Politica de confidențialitate (GDPR)</h1>
      <p>Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}</p>

      <section>
        <h2>1. Cine suntem</h2>
        <p>
          Operator de date: <strong>{/* TODO: Denumire firmă/PFA */} Mihai State PFA</strong><br />
          CUI/CIF: <strong>{/* TODO */} 12345678</strong><br />
          Sediu: <strong>{/* TODO */} București, România</strong><br />
          E-mail: <a href="mailto:{/* TODO */}contact@mihaistate.ro">contact@mihaistate.ro</a>
        </p>
      </section>

      <section>
        <h2>2. Ce date colectăm</h2>
        <ul>
          <li>Date de identificare: nume, e-mail, telefon (dacă îl furnizezi).</li>
          <li>
            Date necesare plății: procesate în siguranță de Stripe (noi nu
            stocăm datele de card).
          </li>
          <li>
            Date pentru prestarea serviciilor: nivel, obiective,
            preferințe/istoric antrenamente, opțional poze „before/after”.
          </li>
          <li>Date tehnice minime (logs de server). Nu folosim cookies de tracking.</li>
        </ul>
      </section>

      <section>
        <h2>3. De ce și pe ce bază legală</h2>
        <ul>
          <li>Executarea contractului (art. 6(1)(b) GDPR) – pentru a livra serviciile achiziționate.</li>
          <li>Interes legitim (art. 6(1)(f)) – pentru îmbunătățirea serviciilor și securitate.</li>
          <li>Consimțământ (art. 6(1)(a)) – pentru date opționale (ex. poze), dacă îl soliciți și îl oferi.</li>
          <li>Obligații legale (art. 6(1)(c)) – facturare și evidențe contabile.</li>
        </ul>
      </section>

      <section>
        <h2>4. Cu cine partajăm datele</h2>
        <ul>
          <li>
            <strong>Stripe Payments Europe</strong> – procesator de plăți conform PCI DSS;
            acționează ca persoană împuternicită independentă pentru datele de plată.
          </li>
          <li>Furnizori IT (hosting/e-mail), doar cât este necesar.</li>
          <li>Autorități publice – doar când legea o impune.</li>
        </ul>
        <p>
          Putem avea transferuri în afara SEE prin furnizori (ex. Stripe); folosim
          mecanisme legale de transfer (clauze standard, măsuri suplimentare).
        </p>
      </section>

      <section>
        <h2>5. Cât timp păstrăm datele</h2>
        <ul>
          <li>Date contractuale: pe durata serviciilor + până la 3 ani (termene de prescripție).</li>
          <li>Date de facturare: 5–10 ani (conform legislației fiscale).</li>
          <li>Conținut opțional (ex. poze): până la retragerea consimțământului sau max. 12 luni.</li>
        </ul>
      </section>

      <section>
        <h2>6. Drepturile tale</h2>
        <ul>
          <li>Acces, rectificare, ștergere („dreptul de a fi uitat”).</li>
          <li>Restricționare, opoziție, portabilitate.</li>
          <li>Retragerea consimțământului, dacă baza a fost consimțământul.</li>
          <li>Plângere la ANSPDCP: <a href="https://www.dataprotection.ro" target="_blank" rel="noreferrer">dataprotection.ro</a>.</li>
        </ul>
        <p>
          Ne poți contacta la:{" "}
          <a href="mailto:{/* TODO */}contact@mihaistate.ro">contact@mihaistate.ro</a>
        </p>
      </section>

      <section>
        <h2>7. Securitate</h2>
        <p>
          Implementăm măsuri tehnice și organizatorice pentru protecția datelor
          (acces limitat, criptare în tranzit, parole robuste). Nicio metodă nu
          este 100% sigură, dar depunem toate eforturile rezonabile.
        </p>
      </section>

      <section>
        <h2>8. Minori</h2>
        <p>
          Serviciile noastre nu se adresează persoanelor sub 16 ani fără acordul
          părinților/tutorilor. Dacă aflăm că am colectat date fără acord,
          le vom șterge.
        </p>
      </section>

      <section>
        <h2>9. Cookies</h2>
        <p>
          Nu folosim cookies de marketing/urmărire. Putem folosi doar cookies strict necesare
          funcționării site-ului (dacă este cazul); acestea nu necesită consimțământ.
        </p>
      </section>

      <section>
        <h2>10. Modificări</h2>
        <p>
          Putem actualiza această politică periodic. Versiunea curentă este
          publicată aici și indică data ultimei actualizări.
        </p>
      </section>
    </main>
  );
}
